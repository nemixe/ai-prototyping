import { lazy } from "react";

export function convertPagesToRoute(files, loadingFiles = {}) {
  let routes = { path: "/" };
  Object.entries(files).forEach(([filePath, importer]) => {
    const segments = getRouteSegmentsFromFilePath(filePath);
    const page = lazy(importer);

    const loadingComponent = findMatchingLoadingComponent(filePath, loadingFiles);

    const route = createRoute({
      PageComponent: page,
      LoadingComponent: loadingComponent,
      segments,
      async action(args) {
        const result = await importer();
        return "action" in result ? result.action?.(args) : null;
      },
      async loader(args) {
        const result = await importer();
        return "loader" in result ? result.loader?.(args) : null;
      },
      async guard() {
        const result = await importer();
        const localStoragePermission = localStorage.getItem("permissions");
        const permissions = localStoragePermission ? JSON.parse(localStoragePermission) : undefined;
        return "permissions" in result
          ? result.permissions?.every(
              (permission) => permissions?.some((item) => permission === item.key) || false,
            ) || false
          : true;
      },
    });
    routes = mergeRoutes(routes, route);
  });
  return routes;
}

function findMatchingLoadingComponent(filePath, loadingFiles) {
  const loadingPath = filePath.replace(/(page|layout)\.tsx$/, "loading.tsx");

  const groupMatch = filePath.match(/\([^/]+\//);
  const groupLoadingPath = groupMatch ? `/${groupMatch[0]}loading.tsx` : null;

  const globalLoadingPath = "./app/loading.tsx";

  const loader =
    loadingFiles[loadingPath] ||
    (groupLoadingPath && loadingFiles[groupLoadingPath]) ||
    loadingFiles[globalLoadingPath];

  if (!loader) return undefined;

  return lazy(loader);
}

function mergeRoutes(target, source) {
  if (target.path !== source.path)
    throw new Error(`Paths do not match: "${target.path}" and "${source.path}"`);

  if (!target.children) {
    target.children = [];
  }

  if (source.handle?.pageType === "layout") {
    if (!target.element) {
      target.element = source.element;
      target.HydrateFallback = source.HydrateFallback;
      target.action = source.action;
      target.loader = source.loader;
      target.handle = source.handle;
      target.errorElement = source.errorElement;
      target.children = target.children ?? [];
    } else if (target.handle?.pageType === "page") {
      target = swapTargetRouteAsIndexRouteAndUpdateWithRoute(target, source);
    }
    return target;
  }

  if (source.handle?.pageType === "page" && !target.children.some((child) => child.index)) {
    target.children.unshift({
      index: true,
      element: source.element,
      HydrateFallback: source.HydrateFallback,
      action: source.action,
      loader: source.loader,
      handle: source.handle,
    });
    return target;
  }

  if (target.handle?.pageType === "layout" && source.handle?.pageType === "page") {
    target = addRouteAsIndexRouteForTargetRoute(target, source);
    return target;
  }

  if (source.children) {
    target.children = target.children ?? [];
    source.children.forEach((sourceChild) => {
      const matchingChild = target.children?.find(
        (targetChild) => targetChild.path === sourceChild.path,
      );
      if (matchingChild) mergeRoutes(matchingChild, sourceChild);
      else target.children.push(sourceChild);
    });
  }

  return target;
}

function swapTargetRouteAsIndexRouteAndUpdateWithRoute(target, route) {
  target.children = target.children ?? [];
  target.children.push({
    index: true,
    element: target.element,
    HydrateFallback: target.HydrateFallback,
    action: target.action,
    loader: target.loader,
    handle: target.handle,
    errorElement: target.errorElement,
  });

  target.element = route.element;
  target.HydrateFallback = route.HydrateFallback;
  target.action = route.action;
  target.loader = route.loader;
  target.handle = route.handle;
  target.errorElement = route.errorElement;

  return target;
}

function addRouteAsIndexRouteForTargetRoute(target, route) {
  target.children = target.children ?? [];
  target.children.push({
    index: true,
    element: route.element,
    HydrateFallback: route.HydrateFallback,
    action: route.action,
    loader: route.loader,
    handle: route.handle,
    errorElement: route.errorElement,
  });
  return target;
}

const separator = "\\";

function createRoute(args) {
  const [current, ...rest] = args.segments;
  const [cleanPath, pageType] = current.split(separator);
  const route = { path: cleanPath };

  if (pageType === "page" || pageType === "layout") {
    route.element = <args.PageComponent />;
    route.HydrateFallback = args.LoadingComponent ?? (() => <div>Loading...</div>);
    route.action = args.action;
    route.loader = async (...props) => {
      return args.loader?.(...props);
    };
    route.handle = { pageType };
  }

  if (rest.length > 0) {
    const nextSegment = rest[0].split(separator)[0];

    if (nextSegment === "update" || nextSegment === "edit") {
      return {
        path: `${cleanPath}/${nextSegment}`,
        element: <args.PageComponent />,
        HydrateFallback: args.LoadingComponent ?? (() => <div>Loading...</div>),
        action: args.action,
        loader: args.loader,
        handle: { pageType },
      };
    }

    const childRoute = createRoute({ ...args, segments: rest });

    if (!route.children) {
      route.children = [];
    }

    if (cleanPath.startsWith(":")) {
      route.children.unshift(childRoute);
    } else {
      route.children.push(childRoute);
    }
  }

  return route;
}

export function getRouteSegmentsFromFilePath(
  filePath,
  transformer = (segment, prevSegment) =>
    `${prevSegment}${separator}${getFileNameWithoutExtension(segment)}`,
) {
  const segments = filePath
    .replace("/app", "")
    .split("/")
    .filter((segment) => !segment.startsWith("(index)") && !segment.startsWith("_"))
    .map((segment) => {
      if (segment.startsWith(".")) return "/";
      if (segment.startsWith("("))
        return getParamFromSegment(segment).replace("(", "").replace(")", "") + "?";
      if (segment.startsWith("[")) return getParamFromSegment(segment);
      return segment;
    });

  return getRouteSegments(segments[0], segments, transformer);
}

function getFileNameWithoutExtension(file) {
  return file.split(".")[0];
}

function getRouteSegments(segment, segments, transformer, entries = [], index = 0) {
  if (index > segments.length) throw new Error("Cannot exceed total number of segments");
  if (index === segments.length - 1) {
    entries.push(transformer(segment, String(entries.pop())));
    return entries;
  }
  const nextIndex = index + 1;
  if (!segment.startsWith(":")) entries.push(segment);
  else entries.push(`${entries.pop()}/${segment}`);
  return getRouteSegments(segments[nextIndex], segments, transformer, entries, nextIndex);
}

function getParamFromSegment(segment) {
  if (segment.includes("...")) return "*";
  return segment.replace("[", ":").replace("]", "");
}

export function addErrorElementToRoutes(errorFiles, routes) {
  Object.entries(errorFiles).forEach(([filePath, importer]) => {
    const segments = getRouteSegmentsFromFilePath(filePath, (_, prevSegment) => prevSegment);
    const ErrorBoundary = lazy(importer);
    setRoute(segments, routes, (route) => {
      route.errorElement = <ErrorBoundary />;
      return route;
    });
  });
}

export function add404PageToRoutesChildren(notFoundFiles, routes) {
  Object.entries(notFoundFiles).forEach(([filePath, importer]) => {
    const segments = getRouteSegmentsFromFilePath(filePath, (_, prevSegment) => prevSegment);
    const NotFound = lazy(importer);
    setRoute(segments, routes, (route) => {
      if (route.children) {
        set404NonPage(routes, <NotFound />);
        route.children.push({ path: "*", element: <NotFound /> });
      } else {
        const tempRoute = Object.assign({}, route);
        route.children = route.children || [];
        route.children.push({
          index: true,
          element: tempRoute.element,
          action: tempRoute.action,
          loader: tempRoute.loader,
        });

        route.children.push({ path: "*", element: <NotFound /> });

        delete route.element;
        delete route.action;
        delete route.loader;
      }
      return route;
    });
  });
}

function set404NonPage(routes, notFoundElement) {
  if (
    routes.path &&
    routes.children?.length &&
    !routes.path.includes("?") &&
    !routes.path.includes("/") &&
    !routes.children.some((child) => child.index)
  ) {
    routes.children.push({
      index: true,
      element: notFoundElement,
    });
  }
  routes.children?.forEach((route) => set404NonPage(route, notFoundElement));
}

function setRoute(segments, route, updater) {
  let temp = route;
  segments.forEach((_segment, i) => {
    const isLastSegment = i === segments.length - 1;
    if (isLastSegment) {
      temp = updater(temp);
      return;
    }

    const nextSegment = segments[i + 1];
    const index = temp.children?.findIndex((child) => child.path === nextSegment);
    if (typeof index !== "number" || index === -1) {
      const msg = `Segment ${nextSegment} does not exist among the children of route with path ${temp.path}`;
      throw new Error(msg);
    }
    temp = temp.children[index];
  });
}

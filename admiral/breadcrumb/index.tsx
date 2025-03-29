import { Breadcrumb as AntdBreadcrumb, theme } from "antd";
import Link from "antd/es/typography/Link";
import { ReactNode, useMemo } from "react";
import { ThemeProvider } from "../context";

export type TBreadcrumbsItem = {
  label: ReactNode;
  path: string;
};

type AntdBreadcrumbProps = React.ComponentPropsWithoutRef<
  typeof AntdBreadcrumb
>;

type DefaultBreadCrumbProps = Omit<AntdBreadcrumbProps, "items"> & {
  breadcrumbs: TBreadcrumbsItem[];
  NavigationAs?: (props: TBreadcrumbsItem) => JSX.Element;
};

/**
 * If the `breadcrumbs` property exists in props, it will have type DefaultBreadCrumbProps
 * Otherwise it will have type AntdBreadcrumbProps
 */

export type PropsBreadcrumb = AntdBreadcrumbProps | DefaultBreadCrumbProps;

const Breadcrumb = ({ style, ...props }: PropsBreadcrumb) => {
  const { token } = theme.useToken();

  /**
   * Generates breadcrumb items based on the provided props.
   *
   * If the `breadcrumbs` property exists in props, it maps over the breadcrumbs array
   * and creates breadcrumb items. For each breadcrumb item:
   * - If it is the last item, it returns an object with `title`.
   * - Otherwise, it returns an object with `title` containing a link component.
   *
   * If the `breadcrumbs` property does not exist in props, it returns the `items` property from props. This is default props from Antd
   */
  const breadcrumbItems = useMemo(() => {
    return "breadcrumbs" in props
      ? props.breadcrumbs.map(({ label, path }, index) => {
          const isLast = props.breadcrumbs.length === index + 1;
          const NavigationAs = props.NavigationAs;

          if (isLast) {
            return {
              title: label,
            };
          } else {
            const BreadCrumbLink = NavigationAs ? (
              <NavigationAs path={path} label={label} />
            ) : (
              <Link href={path}>{label}</Link>
            );

            return {
              title: BreadCrumbLink,
            };
          }
        })
      : props.items;
  }, [props]);

  return (
    <ThemeProvider
      theme={{
        components: {
          Breadcrumb: {
            lastItemColor: token.colorTextSecondary,
          },
        },
      }}
    >
      <AntdBreadcrumb
        style={{
          marginBottom: "8px",
          ...style,
        }}
        {...props}
        items={breadcrumbItems}
      />
    </ThemeProvider>
  );
};

export default Breadcrumb;

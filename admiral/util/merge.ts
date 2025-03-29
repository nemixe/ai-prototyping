/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import type React from "react";

/** https://github.com/Microsoft/TypeScript/issues/29729 */
export type LiteralUnion<T extends string> = T | (string & {});

export type AnyObject = Record<PropertyKey, any>;

export type CustomComponent<P = AnyObject> = React.ComponentType<P> | string;

export type GetProps<T extends React.ComponentType<any> | object> =
  T extends React.ComponentType<infer P> ? P : T extends object ? T : never;

export type GetProp<
  T extends React.ComponentType<any> | object,
  PropName extends keyof GetProps<T>,
> = NonNullable<GetProps<T>[PropName]>;

type ReactRefComponent<Props extends { ref?: React.Ref<any> | string }> = (
  props: Props,
) => React.ReactNode;

type ExtractRefAttributesRef<T> =
  T extends React.RefAttributes<infer P> ? P : never;

export type GetRef<T extends ReactRefComponent<any> | React.Component<any>> =
  T extends React.Component<any>
    ? T
    : T extends React.ComponentType<infer P>
      ? ExtractRefAttributesRef<P>
      : never;

declare const CSSINJS_STATISTIC: any;

const enableStatistic =
  process.env.NODE_ENV !== "production" ||
  typeof CSSINJS_STATISTIC !== "undefined";
let recording = true;

/**
 * This function will do as `Object.assign` in production. But will use Object.defineProperty:get to
 * pass all value access in development. To support statistic field usage with alias token.
 */
export function merge<T extends AnyObject>(...objs: Partial<T>[]): T {
  /* istanbul ignore next */
  if (!enableStatistic) {
    return Object.assign({}, ...objs);
  }

  recording = false;

  const ret = {} as T;

  objs.forEach((obj) => {
    const keys = Object.keys(obj);

    keys.forEach((key) => {
      Object.defineProperty(ret, key, {
        configurable: true,
        enumerable: true,
        get: () => (obj as any)[key],
      });
    });
  });

  recording = true;
  return ret;
}

/** @internal Internal Usage. Not use in your production. */
export const statistic: Record<
  string,
  { global: string[]; component: Record<string, string | number> }
> = {};

/** @internal Internal Usage. Not use in your production. */
// eslint-disable-next-line camelcase
export const _statistic_build_: typeof statistic = {};

/* istanbul ignore next */
function noop() {}

/** Statistic token usage case. Should use `merge` function if you do not want spread record. */
const statisticToken = <T extends AnyObject>(token: T) => {
  let tokenKeys: Set<string> | undefined;
  let proxy = token;
  let flush: (
    componentName: string,
    componentToken: Record<string, string | number>,
  ) => void = noop;

  if (enableStatistic && typeof Proxy !== "undefined") {
    tokenKeys = new Set<string>();

    proxy = new Proxy(token, {
      get(obj: any, prop: any) {
        if (recording) {
          tokenKeys!.add(prop);
        }
        return obj[prop];
      },
    });

    flush = (componentName, componentToken) => {
      statistic[componentName] = {
        global: Array.from(tokenKeys!),
        component: {
          ...statistic[componentName]?.component,
          ...componentToken,
        },
      };
    };
  }

  return { token: proxy, keys: tokenKeys, flush };
};

export default statisticToken;

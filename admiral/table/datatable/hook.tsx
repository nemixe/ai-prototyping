/* eslint-disable @typescript-eslint/no-explicit-any */
import { isObject } from "../../util";
import dayjs from "dayjs";
import { CustomFilter, DataTablePagination, DataTableSorter } from "./type";
import { useEffect, useMemo, useState } from "react";
import qs from "qs";

/**
 * Converts all dayjs instances in an object to Unix timestamps.
 * @param {InputStructure} data - The input object containing dayjs instances.
 * @returns {Object} - The new object with dayjs instances replaced by Unix timestamps.
 *
 * Example:
 *   Input: {
 *    "sort_by": "name",
 *    "order": "ASC",
 *    "created_at": [
 *      dayjs("2022-01-01"),
 *      dayjs("2022-01-10")
 *    ],
 *    "filter-group": {
 *      "role": "customer",
 *      "isActive": true
 *    }
 *   }
 *   Output: {
 *    "sort_by": "name",
 *    "order": "ASC",
 *    "created_at": "2022-01-01;2022-01-10",
 *    "role": "customer",
 *    "isActive": "true"
 *   }
 */
const normalize = (data: any): any => {
  // Check if the input is a dayjs instance
  if (dayjs.isDayjs(data)) return data.unix();

  // Check if the input is an array
  if (Array.isArray(data)) return data.map((item) => normalize(item));

  if (isObject(data)) {
    // Recursively normalize each value in the object
    const normalizedObject = Object.keys(data).reduce(
      (newObj, key) => {
        newObj[key] = normalize(data[key]);
        return newObj;
      },
      {} as Record<string, any>,
    );

    return normalizedObject;
  }
  return data;
};

/**
 * Decode the query string
 * @param searchParams
 * @returns
 */
const decode = (searchParams: string) => {
  return qs.parse(searchParams, {
    decoder(value) {
      if (value[0] !== "0" && /^(\d+|\d*\.\d+)$/.test(value)) {
        return parseFloat(value);
      }

      const keywords = {
        true: true,
        false: false,
        null: null,
        undefined: undefined,
      };

      if (value in keywords) {
        return keywords[value as keyof typeof keywords];
      }

      return decodeURIComponent(value);
    },
  });
};

/**
 * Encode the data into a query string.
 * @param data
 * @param originalSearchParamsString
 * @returns
 */
const encode = (
  data: Record<string, any>,
  originalSearchParamsString: string,
): string => {
  const newSearchParams = new URLSearchParams(
    qs.stringify({ ...decode(originalSearchParamsString), ...data }),
  );

  return newSearchParams.toString().replace(/\+/g, "%20");
};

/**
 * Filter the query string by prefix
 * example:
 *  input: "page=1&per_page=10&filter-name=John&filter-age=20" | prefix: "filter"
 *  output: "name=John&age=20"
 * @param searchParams
 * @param prefix
 * @returns
 */
const filterQueryStringByPrefix = (
  searchParams: string,
  prefix?: string,
): string => {
  return searchParams
    .split("&")
    .filter((param) => {
      if (!prefix) {
        return !param.split("=")[0].includes("-");
      } else {
        return param.startsWith(prefix + "-");
      }
    })
    .map((param) => {
      if (prefix) {
        return param.replace(prefix + "-", "");
      }
      return param;
    })
    .join("&");
};

const addPrefixObjectKeys = (prefix: string, obj: Record<string, any>) => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const newKey = prefix + "-" + key;
      return { ...acc, [newKey]: obj[key] };
    },
    {} as Record<string, any>,
  );
};

export type PaginationFilter = {
  page: number;
  per_page: number;
};

export type UseTableFilterCb = (queryParams: string) => void;
export type Options = {
  prefix?: string;
};

export type UseTableFilterProps = {
  options?: Options;
  searchParams?: URLSearchParams;
  cb?: UseTableFilterCb;
};

export type UseTableFilterReturn = {
  filters: Record<string, any>;
  pagination: PaginationFilter;
  setFilters: (filters: Record<string, string>) => void;
  handleChange: (
    customFilter?: CustomFilter<any>,
    sorter?: DataTableSorter<any>,
    filters?: Record<string, any>,
    pagination?: DataTablePagination,
  ) => void;
};

export const useTableFilter = ({
  searchParams,
  cb,
  options,
}: UseTableFilterProps): UseTableFilterReturn => {
  const searchParamsString = useMemo(() => {
    return searchParams?.toString().replace(/\+/g, "%20") || "";
  }, [searchParams]);

  const localSearchParams = useMemo(
    () => filterQueryStringByPrefix(searchParamsString, options?.prefix),
    [searchParamsString, options?.prefix],
  );

  // Apply the search params to the state
  useEffect(() => {
    setQueryParams(decode(localSearchParams));
  }, [localSearchParams]);

  const [queryParams, setQueryParams] = useState<{
    [key: string]: any;
  }>(decode(localSearchParams));

  // Split the queryParmas state into filters and pagination
  const { filters, pagination } = useMemo(() => {
    return Object.keys(queryParams).reduce(
      (acc, key) => {
        // If the key does not start with the prefix, add it to the filters
        if (key === "page" || key === "per_page") {
          return {
            filters: acc.filters,
            pagination: { ...acc.pagination, [key]: queryParams[key] },
          };
        }
        // If the key does not start with the prefix, add it to the filters
        return {
          filters: { ...acc.filters, [key]: queryParams[key] },
          pagination: acc.pagination,
        };
      },
      {
        filters: {},
        pagination: {},
      } as {
        filters: Record<string, any>;
        pagination: PaginationFilter;
      },
    );
  }, [queryParams]);

  const setFilters = (filters: Record<string, string>) => {
    const newFilters = normalize(filters);
    setQueryParams((old) => ({ ...old, ...newFilters }));

    if (cb) {
      // add prefix to the keys
      const newQueryParamsWithPrefix = options?.prefix
        ? addPrefixObjectKeys(options.prefix, newFilters)
        : newFilters;
      cb(encode(newQueryParamsWithPrefix, searchParamsString));
    }
  };

  return {
    filters,
    pagination,
    setFilters,
    handleChange: (customFilter, sorter, _filters, pagination) => {
      const newQueryParams: Record<string, any> = customFilter || {};

      if (sorter?.sort) {
        newQueryParams.sort_by = sorter.sort;
        newQueryParams.order = sorter?.order || "ASC";
      } else {
        newQueryParams.sort_by = undefined;
        newQueryParams.order = undefined;
      }

      if (pagination?.page) newQueryParams.page = pagination.page;
      if (pagination?.per_page) newQueryParams.per_page = pagination.per_page;

      setFilters(newQueryParams);
    },
  };
};

import { useEffect, useRef, useState } from "react";
import { debounce } from ".";

export const useDidUpdateEffect: typeof useEffect = (fn, inputs) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    } else {
      didMountRef.current = true;
    }
  }, inputs);
};

export const useDebounceState = <T>(
  delay: number,
  value?: T,
): [T | undefined, (value: T) => void] => {
  const [state, setState] = useState<T | undefined>(value);

  const setStateDebounced = debounce(setState, delay);

  return [state, setStateDebounced];
};

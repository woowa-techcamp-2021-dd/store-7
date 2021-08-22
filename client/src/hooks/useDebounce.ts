import { useEffect, useState } from "react";

const DEFAULT_DELAY = 500;

export default (value: string, delay: number = DEFAULT_DELAY) => {
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

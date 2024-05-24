import { useEffect, useState } from 'react';

const getLocalValue = <T>(key: string, initValue: T): T => {
  if (typeof window === 'undefined') {
    return initValue;
  }
  const localValue: T = JSON.parse(<string>localStorage.getItem(key));
  if (localValue) {
    return localValue;
  }

  if (initValue instanceof Function) {
    return initValue();
  }

  return initValue;
};

/**
 * Handle component state using local storage
 *
 * @param key The name of the key.
 * @param initValue The initial value to be used if no local storage item is found.
 * @return Returns two values: the current value stored in local storage and a function to set/update value in the local storage.
 */
export const useLocalStorage = <T>(key: string, initValue: T) => {
  const [value, setValue] = useState<T>(() => {
    return getLocalValue(key, initValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

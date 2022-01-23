import { Dispatch, SetStateAction, useCallback, useState } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    value => {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    },
    [key],
  );

  return [storedValue, setValue];
}

export default useLocalStorage;

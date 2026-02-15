import { useEffect, useState } from "react";

type StorageType = "session" | "local";

const getStorage = (storageType: StorageType): Storage => {
  return storageType === "session" ? sessionStorage : localStorage;
};

const getStorageValue = <T>(storageType: StorageType, key: string): T | null => {
  const storage = getStorage(storageType);
  const storedValue = storage.getItem(key);
  try {
    return storedValue ? (JSON.parse(storedValue) as T) : null;
  } catch {
    return null;
  }
};

const setStorageValue = <T>(storageType: StorageType, key: string, value: T): void => {
  const storage = getStorage(storageType);
  const serializedValue = JSON.stringify(value);
  storage.setItem(key, serializedValue);
};

const useStorage = <T>(
  key: string,
  defaultValue: T,
  storageType: StorageType = "session",
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = getStorageValue<T>(storageType, key);
    return storedValue !== null ? storedValue : defaultValue;
  });

  useEffect(() => {
    setStorageValue(storageType, key, value);
  }, [key, value, storageType]);

  return [value, setValue];
};

export default useStorage;

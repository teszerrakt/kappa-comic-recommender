import { useState, useEffect } from "react";

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
    return storedValue as T;
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
): [T, (newValue: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = getStorageValue<T>(storageType, key);
    return storedValue !== null ? storedValue : defaultValue;
  });

  useEffect(() => {
    setStorageValue(storageType, key, value);
  }, [key, value, storageType]);

  const handleChange = (newValue: T): void => {
    setValue(newValue);
  };

  return [value, handleChange];
};

export default useStorage;

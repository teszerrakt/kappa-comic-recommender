import { useState, useEffect } from "react";

type StorageType = "session" | "local";

const useStorage = <T,>(
  key: string, 
  defaultValue: T, 
  storageType: StorageType = "session"
): [T, (newValue: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = getStorageValue(storageType, key);
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

const getStorageValue = (storageType: StorageType, key: string): any => {
  const storage = getStorage(storageType);
  const storedValue = storage.getItem(key);
  try {
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    return storedValue;
  }
};

const setStorageValue = (storageType: StorageType, key: string, value: any): void => {
  const storage = getStorage(storageType);
  const serializedValue = JSON.stringify(value);
  storage.setItem(key, serializedValue);
};

const getStorage = (storageType: StorageType): Storage => {
  return storageType === "session" ? sessionStorage : localStorage;
};

export default useStorage;

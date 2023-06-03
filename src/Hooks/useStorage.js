import { useState, useEffect } from "react";

const useStorage = (key, defaultValue, storageType = "session") => {
  const [value, setValue] = useState(() => {
    const storedValue = getStorageValue(storageType, key);
    return storedValue !== null ? storedValue : defaultValue;
  });

  useEffect(() => {
    setStorageValue(storageType, key, value);
  }, [key, value, storageType]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return [value, handleChange];
};

const getStorageValue = (storageType, key) => {
  const storage = getStorage(storageType);
  const storedValue = storage.getItem(key);
  try {
    return JSON.parse(storedValue);
  } catch (error) {
    return storedValue;
  }
};

const setStorageValue = (storageType, key, value) => {
  const storage = getStorage(storageType);
  const serializedValue = JSON.stringify(value);
  storage.setItem(key, serializedValue);
};

const getStorage = (storageType) => {
  return storageType === "session" ? sessionStorage : localStorage;
};

export default useStorage;

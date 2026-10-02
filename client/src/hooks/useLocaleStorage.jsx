import React, { useState } from "react";

const useLocaleStorage = (key, defaultVal) => {
  const [localeStorageVal, setLocaleStorageVal] = useState(() => {
    const val = localStorage.getItem(key);

    if (val) {
      return JSON.parse(val);
    } else {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
  });

  const storageFun = (valueOrFun) => {
    let newVal;

    if (typeof valueOrFun === "function") {
      newVal = valueOrFun(localeStorageVal);
    } else {
      newVal = valueOrFun;
    }

    setLocaleStorageVal(newVal);
    localStorage.setItem(key, JSON.stringify(newVal));
  };

  return [localeStorageVal, storageFun];
};

export default useLocaleStorage;

import { useEffect, useState } from "react";

const useDebounce = (inputVal, delay) => {
  const [debounceVal, setDebounceVal] = useState(inputVal);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVal(inputVal);
    }, delay);

    return () => clearTimeout(timer);
  }, [inputVal, delay]);

  return debounceVal;
};

export default useDebounce;

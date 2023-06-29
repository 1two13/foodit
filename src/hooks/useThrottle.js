import { useRef } from 'react';

const useThrottle = (callback, timeout) => {
  const timer = useRef(null);

  return (...args) => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        callback(...args);
        timer.current = null;
      }, timeout);
    }
  };
};

export default useThrottle;

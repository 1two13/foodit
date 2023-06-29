import { useState, useRef } from 'react';
import { ERROR_ALERT_MESSAGE } from '../static/constants';

const useCustomQuery = (query) => {
  const requestRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState();

  if (requestRef.current) return { isLoading, data };
  requestRef.current = true;

  query()
    .then((data) => {
      setData(data);
    })
    .catch(() => {
      setIsError(true);
      setError(ERROR_ALERT_MESSAGE);
    })
    .finally(() => {
      setIsLoading(false);
    });

  return { isLoading, isError, setData, data, error };
};

export default useCustomQuery;

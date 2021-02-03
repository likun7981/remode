import { useCallback, useRef } from 'react';

const usePersistCallback = <T extends Function>(callback: T) => {
  const cbRef = useRef<Function>();

  cbRef.current = callback;

  return useCallback((...args) => cbRef.current!(...args), []);
};

export default usePersistCallback
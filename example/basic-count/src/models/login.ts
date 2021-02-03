import { useState } from 'react';

const useCount = () => {
  const [count, setLoginStatus] = useState(false);
  return {
    count,
    setLoginStatus
  };
};

export default useCount;

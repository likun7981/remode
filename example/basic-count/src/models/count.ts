import { useState } from 'react';
import usePersistCallback from '../usePersistCallback';

const useCount = () => {
  const [count, setCount] = useState({
    value: 0,
  });

  const add = usePersistCallback(() => {
    const shouldAdd = Math.random() > 0.5;
    console.log('是否应该加1： ', shouldAdd ? '是' : '否 ');
    setCount({
      // 如果这里数据没变化，对应组件不会重新渲染
      value: shouldAdd ? count.value + 1 : count.value,
    });
  });

  const subtract = usePersistCallback(() => {
    setCount({
      value: count.value - 1,
    });
  });

  return {
    count,
    add,
    subtract,
  };
};

export default useCount;

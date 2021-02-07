# remode
> **re**act **mode**l 使用hooks管理你的全局状态

[![NPM version][npm]][npm-url] [![NPM downloads][npm-download]][npm-download-url]



[npm]: https://img.shields.io/npm/v/remode.svg
[npm-url]: https://www.npmjs.com/package/remode

[npm-download-url]: https://npmjs.com/package/remode
[npm-download]: https://img.shields.io/npm/dm/remode.svg

--------------------

## 特性

- **轻量** _基于react hooks实现，用React hooks管理你所有的状态，无其他依赖_
- **更快** _会自动追踪state的变化，只有在state改变后才会进行重新渲染组件_
- **易用** _只需三步可以直接使用_
- **学习成本低** _仅仅使用了react，没有额外的学习成本_
- **typescript支持友好** _代码推断更容易_


## 安装

```bash
$ npm i -S remode

## or

$ yarn add remode

```


## 使用(仅需三步)

1. 创建
> 一个文件一个model，逻辑更清晰，维护更方便

```ts
// src/models/user.ts
import { useState } from 'react';


// 通用的hooks，你也可以直接使用ahooks中的usePersistFn
const usePersistCallback = <T extends Function>(callback: T) => {
  const cbRef = useRef<Function>();

  cbRef.current = callback;

  return useCallback((...args) => cbRef.current!(...args), []);
};

function user() {
  const [userInfo, setUserInfo] = useState(null)
  // 这里函数持久化后，不会因为每次重新创建函数导致的额外渲染
  const login = usePersistCallback(() => {
    // 登录逻辑逻辑
  })
  return {
    login,
    userInfo
  }
}
```

2. 初始化
> 每个model拥有自己的命名空间

```ts
// src/models/index.ts

import initModels from 'remode';
import userModel from './user';

export default initModels({
  user: userModel,
  // otherNamespace: otherModel
})
```

3. 使用

```ts
// src/index.tsx

import ReactDOM from 'react-dom'
import Model from './models';

// 在根元素挂载一次Provider;
ReactDOM.render(
    <Model.Provider>
      // 其他元素
    </Model.Provider>,
    document.getElementById('root')
)



// 具体使用
// src/pages/login.tsx
import Model from '../models';

const LoginPage = () => {
  const { userInfo, login } = Model.useModel('user')
  // 其他逻辑
}
```


## 调试
您可以使用logger调试状态,将以下代码添加到文件`src/models/index.ts`;这样你就可以在控制台看到输出状态到控制台

```ts
if(process.env.NODE_ENV === 'development') {
  Model.subscribe(require('remode/logger'))
}
```

## 相关

- 参考来源 [@umi/plugin-model](https://github.com/umijs/plugins/tree/master/packages/plugin-model)，去除了依赖的umi底层的静态编译，任何react项目都可使用，进行了state更新优化

## LICENSE

[MIT][license-url]

[license-url]: https://github.com/likun7981/remode/blob/master/LICENSE
[license]: http://img.shields.io/npm/l/remode.svg

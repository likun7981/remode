# remode
> **re**act **mode**l Use the hooks manage your global state

[![NPM version][npm]][npm-url] [![NPM downloads][npm-download]][npm-download-url]



[npm]: https://img.shields.io/npm/v/remode.svg
[npm-url]: https://www.npmjs.com/package/remode

[npm-download-url]: https://npmjs.com/package/remode
[npm-download]: https://img.shields.io/npm/dm/remode.svg

--------------------

## Features

- **lightweight** _Based on the React hooks to manage all of your state, no other dependencies_
- **faster** _Automatically track the change of the state, only after the state change to re-render the component_
- **easy** _Only three steps can be used directly, use only the react_
- **typescript** _Make you write the React code more easily_


## Install

```bash
$ npm i -S remode

## or

$ yarn add remode

```


## Use(Only three steps)

1. create the model
> A file is a model, logic clearer, more convenient maintenance

```ts
// src/models/user.ts
import { useState } from 'react';

// This is a generic hooks
const usePersistCallback = <T extends Function>(callback: T) => {
  const cbRef = useRef<Function>();

  cbRef.current = callback;

  return useCallback((...args) => cbRef.current!(...args), []);
};

function user() {
  const [userInfo, setUserInfo] = useState(null)
  // Function after persistent here, won't lead to additional rendering
  const login = usePersistCallback(() => {
    // login logic
  })
  return {
    login,
    userInfo
  }
}
```

2. init the model
> Each model has its own namespace

```ts
// src/models/index.ts

import initModels from 'remode';
import userModel from './user';


const Model = initModels({
  user: userModel,
  // otherNamespace: otherModel
})

export default Model
```

3. use the model

```ts
// src/index.tsx

import ReactDOM from 'react-dom'
import Model from './models';

// The root element mount Provider once
ReactDOM.render(
    <Model.Provider>
      // other element
    </Model.Provider>,
    document.getElementById('root')
)



// src/pages/login.tsx
import Model from '../models';

const LoginPage = () => {
  const { userInfo, login } = Model.useModel('user')
  // other logic
}
```

## Debug
You can use a logger to debug your state, add the code the file `src/models/index.ts`;
then you can see the output of the state in the console

```ts
if(process.env.NODE_ENV === 'development') {
  Model.subscribe(require('remode/logger'))
}
```

## Reference

- [@umi/plugin-model](https://github.com/umijs/plugins/tree/master/packages/plugin-model)

## LICENSE

[MIT][license-url]

[license-url]: https://github.com/likun7981/remode/blob/master/LICENSE
[license]: http://img.shields.io/npm/l/remode.svg

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Models from './models';

export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <hr />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  const countModel = Models.useModel('count');
  return <div>{countModel.count.value}</div>;
}

function CompA() {
  // 这里第二个参数可以使用个map，进行数据映射
  const countModel = Models.useModel('count', (m) => ({
    value: m.count.value,
    add: m.add,
    sub: m.subtract,
  }));
  console.log('render CompA');
  return (
    <div>
      <button onClick={countModel.add}>+</button>
      <button onClick={countModel.sub}>-</button>
      <h2>A {countModel.value}</h2>
    </div>
  );
}

function CompB() {
  const countModel = Models.useModel('count');
  console.log('render CompB');
  return <div>B {countModel.count.value}</div>;
}

function About() {
  console.log('render about');
  return (
    <Fragment>
      <CompA />
      <CompB />
    </Fragment>
  );
}

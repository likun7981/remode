import create from 'remode';
import count from './count';
import login from './login';

const Model = create({
  count,
  login,
});

if (process.env.NODE_ENV !== 'production') {
  Model.subscribe(require('remode/logger'));
}

export default Model;

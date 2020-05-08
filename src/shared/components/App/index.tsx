import React from 'react';
import { hot } from 'react-hot-loader/root';
import './styles.css';
import Counter from '../Counter';

function App(): JSX.Element {
  return <Counter />;
}

export default hot(App);

import React from 'react';
import { hot } from 'react-hot-loader/root';
import Counter from '../Counter';
import SEO from '../SEO';
import './styles.css';

function App(): JSX.Element {
  return (
    <>
      <SEO title="App" />
      <Counter />
    </>
  );
}

export default hot(App);

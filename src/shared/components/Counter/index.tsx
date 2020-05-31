import React, { useState } from 'react';
import './styles.css';

function Counter(): JSX.Element {
  const [count, setCount] = useState(0);
  const update = (amount: number) => (): void => setCount((c) => c + amount);

  return (
    <div className="counter">
      <button onClick={update(-5)}>-5</button>
      <button onClick={update(-1)}>-1</button>
      <span className="count" data-testid="count">
        {count}
      </span>
      <button onClick={update(1)}>+1</button>
      <button onClick={update(5)}>+5</button>
    </div>
  );
}

export default Counter;

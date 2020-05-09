import React, { useState } from 'react';

function Counter(): JSX.Element {
  const [count, setCount] = useState(0);
  const update = (amount: number) => (): void => setCount((c) => c + amount);

  return (
    <>
      <button onClick={update(-5)}>--</button>
      <button onClick={update(-1)}>-</button>
      <span data-testid="count">{count}</span>
      <button onClick={update(1)}>+</button>
      <button onClick={update(5)}>++</button>
    </>
  );
}

export default Counter;

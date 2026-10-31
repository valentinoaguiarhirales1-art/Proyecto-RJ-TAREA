import { useState } from 'react';

export default function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="demo-stack centered-demo">
      <div className="count-display" aria-live="polite">
        <span className="count-number">{count}</span>
        <span className="count-label">{count === 1 ? 'clic' : 'clics'}</span>
      </div>
      <div className="demo-actions centered-actions">
        <button className="button button-primary" type="button" onClick={() => setCount((value) => value + 1)}>
          🖱️ Contar clics
        </button>
        <button
          className="button button-quiet"
          type="button"
          onClick={() => setCount(0)}
          disabled={count === 0}
        >
          Reiniciar
        </button>
      </div>
      <p className="helper-text">El contador empieza en cero y suma uno con cada clic.</p>
    </div>
  );
}

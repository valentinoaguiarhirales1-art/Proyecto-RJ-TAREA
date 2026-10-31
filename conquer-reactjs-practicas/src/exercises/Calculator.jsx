import { useState } from 'react';

const operations = [
  { label: 'Sumar', symbol: '+', calculate: (a, b) => a + b },
  { label: 'Restar', symbol: '−', calculate: (a, b) => a - b },
  { label: 'Multiplicar', symbol: '×', calculate: (a, b) => a * b },
  { label: 'Dividir', symbol: '÷', calculate: (a, b) => a / b },
];

export default function Calculator() {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [result, setResult] = useState(null);

  function calculate(operation) {
    if (first.trim() === '' || second.trim() === '') {
      setResult({ error: 'Escribe los dos números antes de calcular.' });
      return;
    }

    const a = Number(first);
    const b = Number(second);
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      setResult({ error: 'Introduce dos números válidos.' });
      return;
    }
    if (operation.symbol === '÷' && b === 0) {
      setResult({ error: 'No se puede dividir entre cero.' });
      return;
    }

    setResult({ value: operation.calculate(a, b), symbol: operation.symbol });
  }

  return (
    <div className="demo-stack">
      <div className="calculator-fields">
        <NumberField id="first-number" label="Primer número" value={first} onChange={setFirst} />
        <span className="calculator-operator" aria-hidden="true">+</span>
        <NumberField id="second-number" label="Segundo número" value={second} onChange={setSecond} />
      </div>
      <div className="operation-grid">
        {operations.map((operation) => (
          <button
            className="button button-operation"
            type="button"
            key={operation.symbol}
            onClick={() => calculate(operation)}
          >
            <span className="operation-symbol" aria-hidden="true">{operation.symbol}</span>
            {operation.label}
          </button>
        ))}
      </div>
      {result && (
        <div className={`result-box${result.error ? ' result-error' : ''}`} role={result.error ? 'alert' : 'status'}>
          {result.error ? (
            <span>{result.error}</span>
          ) : (
            <>
              <span className="result-equation">{first} {result.symbol} {second} =</span>
              <strong>{Number(result.value.toFixed(8))}</strong>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function NumberField({ id, label, value, onChange }) {
  return (
    <div className="field-group">
      <label className="field-label" htmlFor={id}>{label}</label>
      <input
        className="text-input number-input"
        id={id}
        type="number"
        step="any"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="0"
      />
    </div>
  );
}

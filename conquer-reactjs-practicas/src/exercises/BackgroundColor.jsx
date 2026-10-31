import { useState } from 'react';

const colors = ['#d8c9fa', '#ffd8cf', '#c2e9dd', '#f8e6ab', '#c8d8fb', '#f3c7d7', '#d7e8c9'];

export default function BackgroundColor({ onColorChange }) {
  const [colorIndex, setColorIndex] = useState(-1);
  const color = colors[colorIndex];

  function changeColor() {
    let next = Math.floor(Math.random() * colors.length);
    while (next === colorIndex) next = Math.floor(Math.random() * colors.length);
    setColorIndex(next);
    onColorChange(colors[next]);
  }

  return (
    <div className="demo-stack">
      <div
        className="color-stage"
        style={{ backgroundColor: color ?? '#f3effb' }}
        aria-live="polite"
      >
        <span className="color-sparkle" aria-hidden="true">✦</span>
        <p className="color-stage-label">{color ? 'Tu nuevo color' : 'Tu próximo color favorito'}</p>
        <strong className="color-value">{color ?? '¡Haz la prueba!'}</strong>
      </div>
      <div className="demo-actions">
        <button className="button button-primary" type="button" onClick={changeColor}>
          🎨 Cambiar color
        </button>
        <span className="helper-text">Cada clic elige un color diferente.</span>
      </div>
    </div>
  );
}

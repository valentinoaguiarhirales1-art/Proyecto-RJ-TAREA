import { useState } from 'react';

function countWords(value) {
  const trimmed = value.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export default function TextCounter() {
  const [text, setText] = useState('');
  const characters = text.replace(/\s/g, '').length;
  const words = countWords(text);

  return (
    <div className="demo-stack">
      <label className="field-label" htmlFor="text-to-count">Escribe o pega tu texto</label>
      <textarea
        className="text-input text-area"
        id="text-to-count"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Había una vez…"
        rows="6"
      />
      <div className="text-stats" aria-live="polite">
        <Stat icon="🔤" value={characters} label={characters === 1 ? 'carácter' : 'caracteres'} />
        <span className="stat-divider" aria-hidden="true" />
        <Stat icon="📝" value={words} label={words === 1 ? 'palabra' : 'palabras'} />
      </div>
      <p className="helper-text">Los espacios y saltos de línea no cuentan como caracteres.</p>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="stat-item">
      <span aria-hidden="true">{icon}</span>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

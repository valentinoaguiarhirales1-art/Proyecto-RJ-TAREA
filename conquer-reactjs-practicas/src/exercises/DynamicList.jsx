import { useState } from 'react';

export default function DynamicList() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);

  function addItem(event) {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;
    setItems((current) => [...current, { id: crypto.randomUUID(), text: value }]);
    setText('');
  }

  return (
    <div className="demo-stack">
      <form className="input-row" onSubmit={addItem}>
        <label className="sr-only" htmlFor="dynamic-item">Nuevo elemento</label>
        <input
          id="dynamic-item"
          className="text-input"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Escribe algo para tu lista..."
          maxLength={100}
        />
        <button className="button button-primary" type="submit" disabled={!text.trim()}>
          + Agregar
        </button>
      </form>
      <ListSummary count={items.length} />
      {items.length > 0 ? (
        <ul className="item-list">
          {items.map((item) => (
            <li className="item-row" key={item.id}>
              <span className="item-dot" aria-hidden="true">✦</span>
              <span className="item-text">{item.text}</span>
              <button
                className="icon-button delete-button"
                type="button"
                aria-label={`Eliminar ${item.text}`}
                onClick={() => setItems((current) => current.filter(({ id }) => id !== item.id))}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState icon="📋" text="Tu lista está lista para empezar." />
      )}
    </div>
  );
}

function ListSummary({ count }) {
  return <p className="list-summary">{count} {count === 1 ? 'elemento' : 'elementos'}</p>;
}

function EmptyState({ icon, text }) {
  return (
    <div className="empty-state">
      <span className="empty-icon" aria-hidden="true">{icon}</span>
      <p>{text}</p>
    </div>
  );
}

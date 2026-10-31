import { useState } from 'react';

const animals = ['Perro', 'Gato', 'Pez'];

function normalize(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
}

export default function SearchFilter() {
  const [query, setQuery] = useState('');
  const visibleAnimals = animals.filter((animal) => normalize(animal).includes(normalize(query.trim())));

  return (
    <div className="demo-stack">
      <label className="field-label" htmlFor="animal-search">¿Qué animal buscas?</label>
      <div className="search-field">
        <span aria-hidden="true">🔎</span>
        <input
          id="animal-search"
          className="text-input search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Prueba con «ga»..."
        />
        {query && (
          <button className="icon-button" type="button" aria-label="Borrar búsqueda" onClick={() => setQuery('')}>
            ×
          </button>
        )}
      </div>
      <p className="list-summary" aria-live="polite">
        {visibleAnimals.length} {visibleAnimals.length === 1 ? 'resultado' : 'resultados'}
      </p>
      {visibleAnimals.length > 0 ? (
        <ul className="chip-list">
          {visibleAnimals.map((animal) => (
            <li className="animal-chip" key={animal}>
              <span aria-hidden="true">{animal === 'Gato' ? '🐱' : animal === 'Perro' ? '🐶' : '🐾'}</span>
              {animal}
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state compact-empty">
          <span className="empty-icon" aria-hidden="true">🧐</span>
          <p>No encontramos coincidencias. Prueba otra búsqueda.</p>
        </div>
      )}
    </div>
  );
}

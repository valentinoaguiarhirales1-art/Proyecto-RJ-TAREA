import { useEffect, useState } from 'react';
import { exercises } from './data/exercises.js';
import ExerciseFrame from './components/ExerciseFrame.jsx';
import BackgroundColor from './exercises/BackgroundColor.jsx';
import ClickCounter from './exercises/ClickCounter.jsx';
import DynamicList from './exercises/DynamicList.jsx';
import SearchFilter from './exercises/SearchFilter.jsx';
import Calculator from './exercises/Calculator.jsx';
import Stopwatch from './exercises/Stopwatch.jsx';
import PasswordGenerator from './exercises/PasswordGenerator.jsx';
import TextCounter from './exercises/TextCounter.jsx';
import TodoList from './exercises/TodoList.jsx';

const exerciseComponents = [
  BackgroundColor,
  ClickCounter,
  DynamicList,
  SearchFilter,
  Calculator,
  Stopwatch,
  PasswordGenerator,
  TextCounter,
  TodoList,
];

function readRoute() {
  return window.location.hash || '#/';
}

export default function App() {
  const [route, setRoute] = useState(readRoute);
  const [pageColor, setPageColor] = useState(null);

  useEffect(() => {
    const syncRoute = () => setRoute(readRoute());
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  useEffect(() => {
    setPageColor(null);
  }, [route]);

  const match = route.match(/^#\/ejercicio-(\d+)$/);
  const exerciseId = match ? Number(match[1]) : 0;
  const exercise = exercises.find(({ id }) => id === exerciseId);
  const Exercise = exercise ? exerciseComponents[exercise.id - 1] : null;

  return (
    <div className="page-background" style={exerciseId === 1 && pageColor ? { backgroundColor: pageColor } : undefined}>
      <div className="app-shell">
        <header className="site-header">
          <a className="brand" href="#/" aria-label="Prácticas ReactJS, inicio">
            <span className="brand-mark" aria-hidden="true">r.</span>
            <span>prácticas <strong>ReactJS</strong></span>
          </a>
          <a className="header-note" href="#/" aria-label="Ver los nueve ejercicios">
            <span className="header-note-dot" aria-hidden="true" />
            <span>9 ejercicios para explorar</span>
          </a>
        </header>

        <main>
          {Exercise && exercise ? (
            <ExerciseFrame exercise={exercise}>
              {exerciseId === 1
                ? <Exercise onColorChange={setPageColor} />
                : <Exercise />}
            </ExerciseFrame>
          ) : (
            <HomePage />
          )}
        </main>

        <footer className="site-footer">
          <a className="footer-brand" href="#/">Hecho con <span aria-label="cariño">💜</span> y React</a>
          <p>Pequeños pasos, grandes aprendizajes <span aria-hidden="true">✦</span></p>
        </footer>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <section className="home-view" aria-labelledby="home-title">
      <div className="hero">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow"><span aria-hidden="true">✦</span> TU ESPACIO DE PRÁCTICA</span>
          <h1 id="home-title">Nueve ideas.<br /><span>Un montón de práctica.</span></h1>
          <p>
            Ejercicios pequeñitos para aprender React haciendo. Explora, prueba y descubre
            lo que puedes crear con unas pocas líneas de código.
          </p>
          <a className="button button-primary hero-button" href="#ejercicios">
            Explorar ejercicios <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-blob">
            <span className="hero-emoji">⚛️</span>
          </div>
          <span className="art-sparkle sparkle-one">✦</span>
          <span className="art-sparkle sparkle-two">✳</span>
          <div className="floating-note note-top"><span>💡</span> aprender jugando</div>
          <div className="floating-note note-bottom"><span>💜</span> hecho con React</div>
        </div>
        <div className="hero-index" aria-hidden="true"><strong>09</strong><span>prácticas</span></div>
      </div>

      <div className="section-heading" id="ejercicios">
        <div>
          <span className="eyebrow">📚 LA COLECCIÓN</span>
          <h2>¿Qué te gustaría probar?</h2>
        </div>
        <p>Elige una tarjeta y ponte manos a la obra <span aria-hidden="true">✨</span></p>
      </div>

      <div className="exercise-grid">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>

      <div className="closing-note">
        <span className="closing-icon" aria-hidden="true">🌷</span>
        <p><strong>Un ejercicio a la vez.</strong> Todo gran proyecto comienza con algo pequeño.</p>
        <span className="closing-sparkle" aria-hidden="true">✦</span>
      </div>
    </section>
  );
}

function ExerciseCard({ exercise }) {
  return (
    <a className="exercise-card" href={`#/ejercicio-${exercise.id}`}>
      <div className="card-topline">
        <span className="card-icon" aria-hidden="true">{exercise.icon}</span>
        <span className="card-number">{String(exercise.id).padStart(2, '0')}</span>
      </div>
      <div className="card-content">
        <span className="card-concept">{exercise.concept}</span>
        <h3>{exercise.title}</h3>
        <p>{exercise.description}</p>
      </div>
      <span className="card-link">Probar ejercicio <span aria-hidden="true">↗</span></span>
    </a>
  );
}

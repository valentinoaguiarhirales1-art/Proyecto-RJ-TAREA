export default function ExerciseFrame({ exercise, children }) {
  return (
    <section className="exercise-view" aria-labelledby="exercise-title">
      <a className="back-link" href="#/">
        <span aria-hidden="true">←</span> Volver a todos los ejercicios
      </a>
      <div className="exercise-heading">
        <span className="exercise-heading-icon" aria-hidden="true">
          {exercise.icon}
        </span>
        <div>
          <p className="eyebrow">EJERCICIO {String(exercise.id).padStart(2, '0')} · {exercise.concept}</p>
          <h1 id="exercise-title">{exercise.title}</h1>
          <p className="exercise-intro">{exercise.description}</p>
        </div>
      </div>
      <div className="demo-card">{children}</div>
      <p className="exercise-tip">
        <span aria-hidden="true">✨</span> Cada cambio se refleja al instante. ¡Prueba todas las opciones!
      </p>
    </section>
  );
}

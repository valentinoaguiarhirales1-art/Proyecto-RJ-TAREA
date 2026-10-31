import { useEffect, useState } from 'react';

const STORAGE_KEY = 'conquer-reactjs-tareas';

function readTasks() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return { tasks: [], error: '' };
    const tasks = JSON.parse(saved);
    if (!Array.isArray(tasks) || !tasks.every(
      (task) => typeof task.id === 'string'
        && typeof task.text === 'string'
        && typeof task.completed === 'boolean',
    )) {
      throw new Error('El formato guardado no es válido.');
    }
    return { tasks, error: '' };
  } catch (error) {
    console.error('No se pudieron leer las tareas guardadas.', error);
    return {
      tasks: [],
      error: 'No se pudieron leer las tareas guardadas. Se inició una lista nueva.',
    };
  }
}

export default function TodoList() {
  const [initialState] = useState(readTasks);
  const [tasks, setTasks] = useState(initialState.tasks);
  const [text, setText] = useState('');
  const [storageError, setStorageError] = useState(initialState.error);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (!hasChanges) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      setStorageError('');
    } catch (error) {
      console.error('No se pudieron guardar las tareas.', error);
      setStorageError('No se pudieron guardar los cambios. Revisa el almacenamiento de tu navegador.');
    }
  }, [hasChanges, tasks]);

  function addTask(event) {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;
    setTasks((current) => [...current, { id: crypto.randomUUID(), text: value, completed: false }]);
    setHasChanges(true);
    setText('');
  }

  function toggleTask(id) {
    setTasks((current) => current.map(
      (task) => (task.id === id ? { ...task, completed: !task.completed } : task),
    ));
    setHasChanges(true);
  }

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="demo-stack">
      <form className="input-row" onSubmit={addTask}>
        <label className="sr-only" htmlFor="new-task">Nueva tarea</label>
        <input
          className="text-input"
          id="new-task"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="¿Qué tienes pendiente?"
          maxLength={120}
        />
        <button className="button button-primary" type="submit" disabled={!text.trim()}>
          + Agregar
        </button>
      </form>
      <div className="todo-toolbar">
        <p className="list-summary">
          {tasks.length === 0
            ? 'Sin tareas todavía'
            : `${completedCount} de ${tasks.length} ${tasks.length === 1 ? 'completada' : 'completadas'}`}
        </p>
        <button
          className="text-button"
          type="button"
          onClick={() => {
            setTasks((current) => current.filter((task) => !task.completed));
            setHasChanges(true);
          }}
          disabled={completedCount === 0}
        >
          Limpiar completadas
        </button>
      </div>
      {storageError && <p className="feedback-message feedback-error" role="alert">{storageError}</p>}
      {tasks.length > 0 ? (
        <ul className="item-list todo-list">
          {tasks.map((task) => (
            <li className={`item-row todo-row${task.completed ? ' task-completed' : ''}`} key={task.id}>
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="custom-checkbox" aria-hidden="true">{task.completed ? '✓' : ''}</span>
                <span className="item-text">{task.text}</span>
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">🌱</span>
          <p>Un pendiente a la vez. Agrega tu primera tarea.</p>
        </div>
      )}
      <p className="storage-note"><span aria-hidden="true">💾</span> Tus tareas se guardan en este navegador.</p>
    </div>
  );
}

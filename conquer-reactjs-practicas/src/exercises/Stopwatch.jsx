import { useEffect, useRef, useState } from 'react';

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':');
}

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const startTime = useRef(0);

  useEffect(() => {
    if (!running) return undefined;
    const intervalId = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime.current) / 1000));
    }, 200);
    return () => window.clearInterval(intervalId);
  }, [running]);

  function start() {
    startTime.current = Date.now() - elapsed * 1000;
    setRunning(true);
  }

  function pause() {
    setElapsed(Math.floor((Date.now() - startTime.current) / 1000));
    setRunning(false);
  }

  function reset() {
    setRunning(false);
    setElapsed(0);
  }

  return (
    <div className="demo-stack centered-demo">
      <div className={`stopwatch-display${running ? ' is-running' : ''}`} aria-live="off">
        <span className="stopwatch-dot" aria-hidden="true" />
        <output aria-label={`Tiempo transcurrido: ${formatTime(elapsed)}`}>{formatTime(elapsed)}</output>
      </div>
      <div className="demo-actions centered-actions">
        {!running ? (
          <button className="button button-primary" type="button" onClick={start}>
            ▶ Iniciar
          </button>
        ) : (
          <button className="button button-primary" type="button" onClick={pause}>
            ⏸ Pausar
          </button>
        )}
        <button className="button button-quiet" type="button" onClick={reset} disabled={elapsed === 0 && !running}>
          ↺ Reiniciar
        </button>
      </div>
      <p className="helper-text">{running ? 'El tiempo sigue corriendo…' : 'Horas · minutos · segundos'}</p>
    </div>
  );
}

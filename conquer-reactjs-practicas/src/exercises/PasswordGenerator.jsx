import { useState } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+-_?';
const MAX_LENGTH = 128;

function secureRandomIndex(max) {
  const range = 0x100000000;
  const limit = Math.floor(range / max) * max;
  const value = new Uint32Array(1);
  do {
    window.crypto.getRandomValues(value);
  } while (value[0] >= limit);
  return value[0] % max;
}

function createPassword(length) {
  return Array.from({ length }, () => characters[secureRandomIndex(characters.length)]).join('');
}

export default function PasswordGenerator() {
  const [length, setLength] = useState('12');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [copyError, setCopyError] = useState('');
  const [copied, setCopied] = useState(false);

  function generate(event) {
    event.preventDefault();
    const size = Number(length);
    if (!length.trim() || !Number.isInteger(size) || size < 4) {
      setError('La longitud debe ser un número entero mayor o igual a 4.');
      setPassword('');
      setCopied(false);
      setCopyError('');
      return;
    }
    if (size > MAX_LENGTH) {
      setError(`Por favor, elige una longitud de hasta ${MAX_LENGTH} caracteres.`);
      setPassword('');
      setCopied(false);
      setCopyError('');
      return;
    }
    setError('');
    setCopied(false);
    setCopyError('');
    setPassword(createPassword(size));
  }

  async function copyPassword() {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setCopyError('');
    } catch (copyFailure) {
      console.error('No se pudo copiar la contraseña.', copyFailure);
      setCopied(false);
      setCopyError('No fue posible copiarla. Puedes seleccionarla y copiarla manualmente.');
    }
  }

  return (
    <div className="demo-stack">
      <form className="password-form" noValidate onSubmit={generate}>
        <div className="field-group password-length">
          <label className="field-label" htmlFor="password-length">Longitud de la contraseña</label>
          <input
            className="text-input number-input"
            id="password-length"
            type="number"
            min="4"
            max={MAX_LENGTH}
            step="1"
            value={length}
            onChange={(event) => setLength(event.target.value)}
            placeholder="Mínimo 4"
          />
        </div>
        <button className="button button-primary password-submit" type="submit">
          ✨ Generar contraseña
        </button>
      </form>
      {error && <p className="feedback-message feedback-error" role="alert">{error}</p>}
      {password && (
        <div className="password-result">
          <div className="password-output">
            <code>{password}</code>
            <button className="icon-button" type="button" onClick={copyPassword} aria-label="Copiar contraseña">
              {copied ? '✓' : '▢'}
            </button>
          </div>
          <p className={`feedback-message ${copyError ? 'feedback-error' : 'feedback-success'}`} aria-live="polite">
            {copyError || (copied ? '¡Contraseña copiada al portapapeles!' : `${password.length} caracteres · Generada localmente`)}
          </p>
        </div>
      )}
    </div>
  );
}

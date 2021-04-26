import { useEffect } from 'react';
/* -------------------------- */
/* -- HOOKS -- */
/* -------------------------- */

/**
 * Devuelve el estado del evento click outside
 * @param {*} ref  const ref = useRef(); (elemento)
 * @param {*} handler  setOpen(false) (funcion del evento)
 * Ej. useOnClickOutside(ref, () => setOpen(false));
 */
export function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      if (document) {
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
      }
      return () => {
        if (document) {
          document.removeEventListener('mousedown', listener);
          document.removeEventListener('touchstart', listener);
        }
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

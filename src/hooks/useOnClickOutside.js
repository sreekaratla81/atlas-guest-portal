import { useEffect } from 'react';

export function useOnClickOutside(refs, handler) {
  useEffect(() => {
    function onDown(e) {
      const arr = Array.isArray(refs) ? refs : [refs];
      const clickedInside = arr.some(r => r?.current && r.current.contains(e.target));
      if (!clickedInside) handler(e);
    }
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [refs, handler]);
}

export function useOnEsc(handler) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') handler(e); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [handler]);
}

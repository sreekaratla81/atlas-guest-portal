import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function PopoverPortal({ children }) {
  const [el] = useState(() => document.createElement('div'));

  useEffect(() => {
    el.style.position = 'fixed';
    el.style.zIndex = '1000'; // above sticky bars
    document.body.appendChild(el);
    return () => { document.body.removeChild(el); };
  }, [el]);

  return createPortal(children, el);
}

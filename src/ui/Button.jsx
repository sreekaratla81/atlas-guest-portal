import React from 'react';
import './button.css';

export default function Button({ variant = 'primary', className = '', ...props }) {
  const classes = `btn btn-${variant} ${className}`.trim();
  return <button {...props} className={classes} />;
}

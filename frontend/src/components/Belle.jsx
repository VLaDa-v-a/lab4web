import React from 'react';
import './Belle.css';

export const BelleProvider = ({ children, config }) => {
  return <>{children}</>;
};

export const TextInput = ({ value, onUpdate, placeholder, type = 'text', disabled = false }) => {
  const handleChange = (e) => {
    if (onUpdate) {
      onUpdate({ value: e.target.value });
    }
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className="belle-input"
    />
  );
};

export const ComboBox = ({ value, onUpdate, disabled = false, children }) => {
  const handleChange = (e) => {
    if (onUpdate) {
      onUpdate({ value: e.target.value });
    }
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={disabled}
      className="belle-select"
    >
      {children}
    </select>
  );
};

export const Button = ({ children, onClick, type = 'button', disabled = false, primary = false }) => {
  const className = `belle-button ${primary ? 'belle-button-primary' : ''}`;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};

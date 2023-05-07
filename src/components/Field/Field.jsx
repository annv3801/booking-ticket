import React from 'react';

const Field = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col items-start ${className}`}>{children}</div>
  );
};

export default Field;
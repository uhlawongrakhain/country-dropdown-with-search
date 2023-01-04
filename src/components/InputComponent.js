import React from 'react';

const InputComponent = ({ label, ...rest }) => {
  return (
    <div>
      <p style={{ fontWeight: 'bold' }}>{label}</p>
      <div className='inputs'>
        <input {...rest} />
      </div>
    </div>
  );
};

export default InputComponent;

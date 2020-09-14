import React from 'react';

const ValidationComponent = props => {
  const invalidStyle = {
    color: 'red'
  };

  const validStyle = {
    color: 'green'
  };

  if (props.length < 5) {
    return (
      <p style={invalidStyle}>Text too short</p>
    );
  }
  return (
    <p style={validStyle}>Text long enough</p>
  );
}

export default ValidationComponent;
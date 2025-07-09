import React from 'react';

const CircularProgress = ({ value = 2060, label = "Remaining", percent = 0.9 }) => {
  const progressDegrees = percent * 360;

  return (
    <div
      style={{
        position: 'relative',
        width: '240px',
        height: '240px',
        borderRadius: '50%',
        background: `conic-gradient(#f4b860 ${progressDegrees}deg, #e6e6e6 0deg)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          content: '',
          position: 'absolute',
          width: '180px',
          height: '180px',
          background: 'white',
          borderRadius: '50%',
        }}
      />
      <div style={{ position: 'absolute', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</div>
        <div style={{ fontSize: '12px', color: '#555' }}>{label}</div>
      </div>
    </div>
  );
};

export default CircularProgress;

import React from 'react';
import { RightCircleOutlined } from '@ant-design/icons';

function Banner({ message, secondary, link }) {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#1890ff',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p
        style={{
          marginBottom: '0',
          fontWeight: '500',
          fontSize: '1.2em',
          color: 'white',
        }}
      >
        {message + ' '}
        <span>
          <a href={link} style={{ color: 'black' }}>
            {secondary + ' '}
            <RightCircleOutlined style={{ fontSize: '0.9em' }} />
          </a>
        </span>
      </p>
    </div>
  );
}

export default Banner;

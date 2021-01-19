import React from 'react';
import { Header, Affix } from '../ant';

function FormHeader() {
  return (
    <Affix offsetTop={0}>
      <Header style={{ backgroundColor: '#fff', paddingLeft: '0' }}>
        <a href="/">
          <img
            alt="logo"
            style={{ float: 'left', marginRight: '40px' }}
            src="/logo.png"
            width={'160px'}
          />
        </a>
      </Header>
    </Affix>
  );
}

export default FormHeader;

import React from 'react';
import { Menu, Header, Search, Affix } from '../ant';

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
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="s" disabled>
            <Search
              className="menu-search"
              style={{ marginTop: '20px' }}
              placeholder="Search for Resources"
              enterButton
              onSearch={console.log}
            />
          </Menu.Item>
        </Menu>
      </Header>
    </Affix>
  );
}

export default FormHeader;

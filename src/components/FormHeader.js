import React from 'react';
import { Header, Affix, Menu, Search, Button } from '../ant';
import LoginButton from '../components/LoginButton';
import { useHistory } from 'react-router';

function FormHeader() {
  let history = useHistory();
  let updateSearch = (query) => {
    let segments = [];
    segments.push('q=' + (query || ''));
    let url = '/resources?' + segments.join('&');
    window.gtag('event', 'search_bar_query', {
      event_label: query,
      event_category: 'search',
    });
    history.push(url);
  };
  return (
    <Affix offsetTop={0}>
      <Header style={{ backgroundColor: '#fff', paddingLeft: '0' }}>
        <div
          style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            alignItems: 'center',
            textAlign: 'center',
            width: '180px',
          }}
        >
          <a href="/">
            <img
              alt="logo"
              style={{ float: 'center' }}
              src="/rai-logo-text.png"
              width="160"
            />
          </a>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ position: 'absolute', top: '0px', left: '180px' }}
        >
          <Menu.Item key="s" disabled>
            <Search
              className="menu-search"
              style={{ marginTop: '20px' }}
              placeholder={'Search for resources'}
              enterButton
              onSearch={(q) => updateSearch(q)}
            />
          </Menu.Item>
          <Menu.Item key="resources" onClick={() => history.push('/resources')}>
            Resources
          </Menu.Item>
          <Menu.Item
            key="organizations"
            onClick={() => history.push('/organizations')}
          >
            Organizations
          </Menu.Item>
          <Menu.Item key="feedback" onClick={() => history.push('/feedback')}>
            Feedback
          </Menu.Item>
          <Menu.Item key="faq" onClick={() => history.push('/faq')}>
            FAQ
          </Menu.Item>
          <Menu.Item
            key="upload"
            onClick={() => history.push('/resources/create')}
          >
            <Button style={{ borderRadius: '10px', fontWeight: 'bold' }}>
              Add A Resource
            </Button>
          </Menu.Item>
        </Menu>
        <div style={{ position: 'absolute', top: '0px', right: '20px' }}>
          <LoginButton />
        </div>
      </Header>
    </Affix>
  );
}

export default FormHeader;

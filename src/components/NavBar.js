import React from 'react';
import { Affix, Menu, Header, Search, Button } from '../ant';
import LoginButton from '../components/LoginButton';
import { useHistory } from 'react-router';
import { DownOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

function NavBar() {
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
          <SubMenu
            key="topics-submenu"
            title={
              <span>
                Topics <DownOutlined style={{ fontSize: '0.8em' }} />
              </span>
            }
          >
            <Menu.Item key="topics" onClick={() => history.push('/topics')}>
              Health
            </Menu.Item>
            <Menu.Item
              key="procurement"
              onClick={() => history.push('/topics')}
            >
              Procurement
            </Menu.Item>
          </SubMenu>
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

export default NavBar;

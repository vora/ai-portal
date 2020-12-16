import React, { useEffect, useState } from 'react';
import {
  Layout,
  Content,
  Menu,
  SubMenu,
  Sider,
  Header,
  Select,
  Search,
  Affix,
  Space,
} from '../ant';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';
import ResourceCard from '../components/ResourceCard';
import API from '../api';
import { queryParamsFromProps } from '../util';
import { AppEnv } from './../env';

function Resources(props) {
  let { q } = queryParamsFromProps(props);
  let { enums } = AppEnv();
  let [resources, setResources] = useState([]);
  useEffect(() => {
    let fetchResources = async () => {
      let resources = await API.get('/api/resources', { query: q });
      setResources(resources);
    };
    fetchResources();
  }, [q]);
  return (
    <Layout>
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
            <Menu.Item key="1">20 Datasets</Menu.Item>
            <Menu.Item key="2">5 Tools</Menu.Item>
            <Menu.Item key="3">520 Articles</Menu.Item>
            <Menu.Item key="4">&#43; Suggest Resource</Menu.Item>
          </Menu>
          <div style={{ position: 'absolute', top: '0px', right: '20px' }}>
            <LoginButton />
          </div>
        </Header>
      </Affix>
      <Layout>
        <Affix offsetTop={64}>
          <Sider width={200}>
            <Menu
              mode="inline"
              theme="light"
              defaultSelectedKeys={['topics']}
              defaultOpenKeys={['topics', 'groups']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="21" disabled>
                <Select
                  showSearch
                  defaultValue="Organization"
                  style={{ width: '100%' }}
                >
                  <Select.Option value="lucy">
                    World Economic Forum
                  </Select.Option>
                  <Select.Option value="lucy">AI Global</Select.Option>
                </Select>
              </Menu.Item>
              <Menu.Item key="2" disabled>
                <Select defaultValue="Format" style={{ width: '100%' }}>
                  <Select.Option value="lucy">PDF</Select.Option>
                  <Select.Option value="lucy">CSV</Select.Option>
                  <Select.Option value="lucy">JSON</Select.Option>
                  <Select.Option value="lucy">Excel</Select.Option>
                </Select>
              </Menu.Item>
              <Menu.Item key="3" disabled>
                <Select defaultValue="Sort By" style={{ width: '100%' }}>
                  <Select.Option value="lucy">Relevance</Select.Option>
                  <Select.Option value="lucy">Title</Select.Option>
                  <Select.Option value="lucy">Date</Select.Option>
                </Select>
              </Menu.Item>
              <SubMenu key="topics" title="Topics">
                <Menu.Item key="11">Economy</Menu.Item>
                <Menu.Item key="12">Education</Menu.Item>
                <Menu.Item key="13">Health</Menu.Item>
              </SubMenu>
              <SubMenu key="groups" title="Categories">
                <Menu.Item key="21">Fairness</Menu.Item>
                <Menu.Item key="22">Bias</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
        </Affix>
        <Layout style={{ padding: '24px 24px 24px' }}>
          <Content>
            <Space direction="vertical" style={{ width: '100%' }}>
              {resources.map((res) => (
                <ResourceCard key={res._id} resource={res} />
              ))}
            </Space>
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
}

// mock data for testing modal
// I kept this in to show the visual if resources is empty
// let MOCK_DATA = [
//   {
//     id: 1,
//     name: 'Example 1',
//     type: ['api'],
//     desc: 'Lorem ipsum',
//     link: 'https://www.google.com',
//   },
//   {
//     id: 2,
//     name: 'Example 2',
//     type: ['algorithm', 'api'],
//     desc: 'Lorem ipsum',
//   },
//   {
//     id: 3,
//     name: 'Example 3',
//     type: ['algorithm'],
//     desc: 'Lorem ipsum',
//   },
// ];

export default Resources;

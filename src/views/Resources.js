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
import { useAppEnv } from './../env';
import { FilterTwoTone } from '@ant-design/icons';

function Resources(props) {
  let { q } = queryParamsFromProps(props);
  let { enums } = useAppEnv();
  let fileTypes = enums ? enums.FILE_TYPES : [];
  let orgTypes = enums ? enums.ORG_TYPES : [];
  let resourceTypes = enums ? enums.RESOURCE_TYPES : [];
  let resourcePath = enums ? enums.RESOURCE_PATHS : [];

  let [resources, setResources] = useState([]);
  let [topics, setTopics] = useState([]); // bug with number of topics
  let [orgs, setOrgs] = useState([]);

  useEffect(() => {
    let fetchResources = async () => {
      let resources = await API.get('/api/resources', { query: q });
      setResources(resources);
    };
    let fetchTopics = async () => {
      let topics = await API.get('/api/topics');
      setTopics(topics);
    };
    let fetchOrganizations = async () => {
      let orgs = await API.get('/api/organizations');
      setOrgs(orgs);
    };
    fetchResources();
    fetchTopics();
    fetchOrganizations();
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
              <Menu.Item style={{ marginTop: '10px' }}>
                <h1
                  style={{
                    fontSize: '1.2em',
                    width: '100%',
                    fontWeight: 'bolder',
                  }}
                >
                  <FilterTwoTone style={{ fontSize: '1em' }} />
                  Filters
                </h1>
              </Menu.Item>
              <Menu.Item key="orgs" disabled>
                <Select
                  showSearch
                  defaultValue="Organization"
                  style={{ width: '100%' }}
                >
                  {orgs.map((res) => (
                    <Select.Option value={res.name}>{res.name}</Select.Option>
                  ))}
                </Select>
              </Menu.Item>
              <Menu.Item key="orgTypes" disabled>
                <Select
                  showSearch
                  defaultValue="Organization Type"
                  style={{ width: '100%' }}
                >
                  {orgTypes.map((res) => (
                    <Select.Option value={res}>{res}</Select.Option>
                  ))}
                </Select>
              </Menu.Item>
              <Menu.Item key="resourceTypes" disabled>
                <Select
                  showSearch
                  defaultValue="Resource Type"
                  style={{ width: '100%' }}
                >
                  {resourceTypes.map((res) => (
                    <Select.Option value={res}>{res}</Select.Option>
                  ))}
                </Select>
              </Menu.Item>
              <Menu.Item key="paths" disabled>
                <Select
                  showSearch
                  defaultValue="Resource Path"
                  style={{ width: '100%' }}
                >
                  {resourcePath.map((res) => (
                    <Select.Option value={res}>{res}</Select.Option>
                  ))}
                </Select>
              </Menu.Item>
              <Menu.Item key="fileTypes" disabled>
                <Select defaultValue="Format" style={{ width: '100%' }}>
                  {fileTypes.map((res) => (
                    <Select.Option value={res.ext}>{res.name}</Select.Option>
                  ))}
                </Select>
              </Menu.Item>
              <Menu.Item key="sort" disabled>
                <Select defaultValue="Sort By" style={{ width: '100%' }}>
                  <Select.Option value="relevance">Relevance</Select.Option>
                  <Select.Option value="title">Title</Select.Option>
                  <Select.Option value="date">Date</Select.Option>
                </Select>
              </Menu.Item>
              <SubMenu key="topics" title="Topics" disabled>
                {topics.map((res, index) => (
                  <Menu.Item key={'1' + String(index + 1)}>
                    {res.name}
                  </Menu.Item>
                ))}
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

export default Resources;

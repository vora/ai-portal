import React from 'react';
import {
  Layout,
  Content,
  Menu,
  SubMenu,
  Sider,
  Header,
  Select,
  Search,
  Card,
  Affix,
  Badge,
  Space,
  Tag,
  Footer,
} from '../ant';

function Datasets() {
  return (
    <Layout>
      <Affix offsetTop={0}>
        <Header style={{ backgroundColor: '#fff', paddingLeft: '0' }}>
          <img
            style={{ float: 'left', marginRight: '40px' }}
            src="/logo.png"
            width={'160px'}
          />
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
              {[...Array(20).keys()].map((i) => (
                <DatasetCard key={i} />
              ))}
            </Space>
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: 'center', backgroundColor: '#fff' }}>
        Footer and Copyright AI Global
      </Footer>
    </Layout>
  );
}

function DatasetCard() {
  return (
    <Card
      title={<a>ImageNet</a>}
      extra={[
        <Tag>Custom</Tag>,
        <Tag>Computer Vision</Tag>,
        <Badge style={{ backgroundColor: '#52c41a' }} count={'A+'} />,
      ]}
    >
      <Card.Meta description="A big dataset with lots of images for testing deep learning models." />
    </Card>
  );
}

export default Datasets;

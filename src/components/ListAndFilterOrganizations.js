import React, { useEffect, useState } from 'react';
import {
  Layout,
  Content,
  Menu,
  Sider,
  Select,
  Affix,
  Space,
  Spin,
  Button,
} from '../ant';
import { useAppEnv } from '../env';
import { FilterTwoTone, RedoOutlined } from '@ant-design/icons';
import OrganizationCard from './OrganizationCard';

export default function ListAndFilterOrganizations({
  orgTypes,
  query,
  filterVals,
  updateSearch,
}) {
  let { api } = useAppEnv();
  let [loading, setLoading] = useState(true);
  let [orgs, setOrgs] = useState(null);
  useEffect(() => {
    setLoading(true);
    api
      .get('/api/organizations', { query: query, ...filterVals })
      .then((orgs) => {
        setOrgs(orgs);
        setLoading(false);
      });
  }, [query, api, filterVals]);
  let updateFilters = (newFilters) => {
    updateSearch(query, { ...filterVals, ...newFilters });
  };
  return (
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
            <Menu.Item key="orgTypes" disabled>
              <Select
                onChange={(v) => updateFilters({ type: v })}
                showSearch
                defaultValue="Organization Type"
                style={{ width: '100%' }}
              >
                {orgTypes.map((res) => (
                  <Select.Option value={res}>{res}</Select.Option>
                ))}
              </Select>
            </Menu.Item>
            <Menu.Item disbled>
              <Button href="/organizations?q=">
                Reset Filters <RedoOutlined style={{ marginRight: '0' }} />
              </Button>
            </Menu.Item>
          </Menu>
        </Sider>
      </Affix>
      <Layout style={{ padding: '24px 24px 24px' }}>
        <Content>
          {!loading && (
            <Space direction="vertical" style={{ width: '100%' }}>
              {orgs.map((org) => (
                <OrganizationCard key={org._id} organization={org} />
              ))}
            </Space>
          )}
          {loading && <Spin />}
        </Content>
      </Layout>
    </Layout>
  );
}

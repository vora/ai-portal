import React from 'react';
import {
  Layout,
  Header,
  Menu,
  Content,
  Breadcrumb,
  Footer,
  Search,
  Row,
  Col,
  Card,
  Meta,
} from '../ant';

function Landing() {
  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <img src="/logo.png" width={'200px'} />
      <Content style={{ padding: '0 50px' }}>
        <Row justify="center" style={{ marginTop: '4rem' }}>
          <Col span={12} style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem' }}>Responsible AI Resource Search</h1>
            <Search
              placeholder="Search for Resources"
              enterButton
              size="large"
              onSearch={(value) => console.log(value)}
            />
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '2rem' }} gutter={[24, 16]}>
          <Col span={4}>
            <FeatureCard />
          </Col>
          <Col span={4}>
            <FeatureCard />
          </Col>
          <Col span={4}>
            <FeatureCard />
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: '#fff' }}>
        Footer and Copyright AI Global
      </Footer>
    </Layout>
  );
}

function FeatureCard() {
  return (
    <Card
      hoverable
      style={{ width: '100%' }}
      cover={
        <img
          alt="my alt"
          src="https://specials-images.forbesimg.com/imageserve/1138781799/960x0.jpg?fit=scale"
        />
      }
    >
      <Meta
        title="A Cool Article"
        description="See how tech startup is dealing with bias."
      />
    </Card>
  );
}

export default Landing;

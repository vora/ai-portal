import React, { useRef } from 'react';
import { Layout, Menu, Header, Row, Search, Affix, Content, Col } from '../ant';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';
import { useHistory } from 'react-router';
import FAQ from '../components/Faq';
import { BackTop } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';

function Faq() {
  let history = useHistory();
  let faqRef = useRef(null);
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
                placeholder={'Search for resources'}
                enterButton
                onSearch={(q) => updateSearch(q)}
              />
            </Menu.Item>
            <Menu.Item
              key="resources"
              onClick={() => history.push('/resources')}
            >
              Resources
            </Menu.Item>
            <Menu.Item
              key="organizations"
              onClick={() => history.push('/organizations')}
            >
              Organizations
            </Menu.Item>
            <Menu.Item
              key="upload"
              onClick={() => history.push('/resources/create')}
            >
              Upload
            </Menu.Item>
            <Menu.Item key="feedback" onClick={() => history.push('/feedback')}>
              Feedback
            </Menu.Item>
            <Menu.Item key="faq" onClick={() => history.push('/faq')}>
              FAQ
            </Menu.Item>
          </Menu>
          <div style={{ position: 'absolute', top: '0px', right: '20px' }}>
            <LoginButton />
          </div>
        </Header>
      </Affix>
      <Content style={{ padding: '0 50px', backgroundColor: 'white' }}>
        <BackTop>
          <UpCircleOutlined style={{ fontSize: '3em', color: '#1890ff' }} />
        </BackTop>
        <Row
          justify="center"
          style={{ marginTop: '4rem', textAlign: 'center' }}
        >
          <Col span={15}>
            <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
              About the Responsible AI Community Portal
            </h1>
            <p
              style={{
                marginBottom: '15px',
                fontSize: '1.4em',
                textAlign: 'start',
              }}
            >
              The Responsible AI Community Portal is a{' '}
              <strong>
                selected repository of reports, standards, models, government
                policies, datasets, and open-source software
              </strong>{' '}
              designed to support Responsible AI development. If you'd like to
              learn more, watch the demo below or explore our{' '}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  faqRef.current.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                FAQ
              </a>
              .
            </p>
            <p style={{ fontWeight: 'bold', fontSize: '1.4em' }}>
              Video Demonstration
            </p>
            <iframe
              title="Demo"
              width="640"
              height="385"
              src="https://www.youtube.com/embed/Nucvst3tC90"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '2rem' }}>
          <div ref={faqRef}>
            <h1
              style={{
                fontSize: '1.5em',
                fontWeight: 'bold',
                marginTop: '6rem',
              }}
            >
              Frequently Asked Questions
            </h1>
          </div>
        </Row>
        <Row justify="center" style={{ marginTop: '0.2rem' }}>
          <Col span={15}>
            <FAQ />
          </Col>
        </Row>
      </Content>

      <Footer />
    </Layout>
  );
}

export default Faq;

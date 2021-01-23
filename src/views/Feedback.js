import React from 'react';
import {
  Layout,
  Content,
  Form,
  Row,
  Col,
  Button,
  Typography,
  Input,
  notification,
  Header,
  Affix,
  Breadcrumb,
  Menu,
} from '../ant';
import Footer from '../components/Footer';
import MultiSelectField from '../components/FormMultiSelectField';
import FormField from '../components/FormField';
import { useAppEnv } from './../env';
const { TextArea } = Input;

const { Title } = Typography;

export default function Feedback(props) {
  let { api } = useAppEnv();
  let onSubmit = async (values) => {
    await api.post('/api/feedback/submit', values);
    notification.info({ message: 'Sent!' });
  };
  let onFail = (values) => {
    for (let err of values.errorFields) {
      notification.error({
        message: err.errors[0],
      });
    }
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/resources">Resources</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/organizations">Organizations</a>
      </Menu.Item>
      <Menu.Item></Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'scroll' }}>
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
          <Breadcrumb
            style={{
              paddingTop: '40px',
            }}
          >
            <Breadcrumb.Item>
              <a href="/" style={{ fontSize: '16px' }}>
                Home
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ fontSize: '16px' }} overlay={menu}>
              Suggestions
            </Breadcrumb.Item>
          </Breadcrumb>
        </Header>
      </Affix>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Row
          justify="center"
          style={{ marginTop: '4rem', marginBottom: '4rem' }}
        >
          <Col
            span={12}
            style={{
              textAlign: 'center',
              backgroundColor: '#fff',
              padding: '26px',
              minWidth: '700px',
            }}
          >
            <Typography>
              <Title style={{ minWidth: '500px' }}>Suggestions</Title>
            </Typography>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onSubmit}
              onFinishFailed={onFail}
              style={{ minWidth: '600px' }}
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 13 }}
            >
              <MultiSelectField
                field="Suggestion Category"
                mode="multiple"
                options={[
                  'Uploading my resource',
                  'Suggesting a resource',
                  'Getting involved with AI Global',
                  'Recommending feedback on Portal',
                  'Other',
                ]}
                req={true}
              />

              <Form.Item
                name="Comments"
                label="Comments"
                rules={[
                  {
                    required: true,
                    message: 'Please add the comments',
                  },
                ]}
              >
                <TextArea rows={7}></TextArea>
              </Form.Item>
              <FormField field="Email" req={true} />
              <FormField field="Name" req={true} />
              <FormField
                field="Organization"
                text="Any AI related organizations that you are a part of"
                req={false}
              />

              <Form.Item justify="center">
                <Button type="primary" htmlType="submit" shape="round" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Footer />
      </div>
    </Layout>
  );
}

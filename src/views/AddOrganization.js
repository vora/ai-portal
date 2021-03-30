import React, { useEffect } from 'react';
import {
  Layout,
  Content,
  Button,
  Form,
  Col,
  Typography,
  Row,
  notification,
  message,
} from '../ant';
import Footer from '../components/Footer';
import FormQuestion from '../components/FormQuestion';
import NavBar from '../components/NavBar';
import { useAppEnv } from './../env';

import { useHistory } from 'react-router';

const { Title } = Typography;

function AddOrganizations() {
  let { api, enums, user } = useAppEnv();
  let history = useHistory();
  useEffect(() => {
    if (user === null || (user && user.role !== 'admin')) {
      history.push('/');
    }
  }, [user, history]);
  let onSubmit = async (formVal) => {
    let result = await api.post('/api/organizations', {
      shortName: formVal.shortName,
      country: formVal.country,
      city: formVal.city,
      logoURL: formVal.logoURL,
      websiteURL: formVal.websiteURL,
      members: [],
      resources: [],
      name: formVal.name,
      type: formVal.type,
    });
    if (result.errors) {
      for (let msg of result.errors) {
        notification['error']({
          message: msg.msg,
        });
      }
      return;
    }
    message.success('Form successfully submitted');

    history.push('/resources');
  };
  let onFail = (values) => {
    console.log(values);
    for (let err of values.errorFields) {
      notification['error']({
        message: err.errors[0],
      });
    }
  };
  const questions = [
    {
      string: 'Organization Name',
      val: 'name',
      type: 'type',
      required: true,
      tip: 'The full name of the organization that you are adding',
    },
    {
      string: 'Short Name',
      val: 'shortName',
      type: 'type',
      required: false,
      tip: 'Any acronyms or abbreviations for this organization',
    },
    {
      string: 'City',
      val: 'city',
      type: 'type',
      required: false,
      tip: 'The city where this organization is located',
    },
    {
      string: 'Country',
      val: 'country',
      type: 'type',
      required: true,
      tip: 'Location of this organization',
    },
    {
      string: 'URL of Logo',
      val: 'logoURL',
      type: 'type',
      required: false,
      tip: "A URL that stores an image of the organizaiton's logo",
    },
    {
      string: 'Website URL',
      val: 'websiteURL',
      type: 'type',
      required: true,
      tip: "A URL for the organization's website",
    },
    {
      string: 'Users',
      val: 'members',
      type: 'multiple',
      options: [],
      required: false,
      tip: 'Users who are a part of this organization',
    },
    {
      string: 'Organization Type',
      val: 'type',
      type: 'select',
      options: enums
        ? enums.ORG_TYPES.map((type) => {
            return { name: type, label: type };
          })
        : [],
      required: true,
      tip: "A URL for the organization's website",
    },
  ];
  return (
    <Layout>
      <NavBar />
      <Layout style={{ height: `${window.innerHeight}px` }}>
        <Content style={{ padding: '0 50px' }}>
          <Row justify="center" style={{ marginTop: '2rem' }}>
            <Col
              span={8}
              style={{
                textAlign: 'center',
                backgroundColor: '#fff',
                padding: '26px',
                minWidth: '50%',
              }}
            >
              <Typography>
                <Title level={2}>Add an Organization</Title>
              </Typography>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                onFinishFailed={onFail}
                style={{ minWidth: '600px' }}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
              >
                {questions.map((question) => (
                  <FormQuestion question={question} />
                ))}

                <Form.Item justify="center">
                  <Button type="primary" htmlType="submit" shape="round" block>
                    Submit Organization
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}

export default AddOrganizations;

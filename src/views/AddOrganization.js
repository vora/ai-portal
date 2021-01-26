import React from 'react';
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
import FormHeader from '../components/FormHeader';
import { useAppEnv } from './../env';

import { useHistory } from 'react-router';

const { Title } = Typography;

function AddOrganizations() {
  let { api } = useAppEnv();
  let history = useHistory();
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
      required: true,
      tip: 'Any acronyms or abbreviations for this organization',
    },
    {
      string: 'City',
      val: 'city',
      type: 'type',
      required: true,
      tip: 'The city where this organization is located',
    },
    {
      string: 'Country',
      val: 'country',
      type: 'select',
      options: ['A', 'B', ''],
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
      options: ['Alice', 'Bob'],
      required: true,
      tip: 'Users who are a part of this organization',
    },
    {
      string: 'Organization Type',
      val: 'type',
      type: 'select',
      options: ['Industry', 'Academia', 'Government', 'Civil Society', 'Other'],
      required: true,
      tip: "A URL for the organization's website",
    },
  ];
  return (
    <Layout>
      <FormHeader />
      <Layout
        style={{ height: `${window.innerHeight - 120}px`, overflow: 'hidden' }}
      >
        <Content style={{ padding: '0 50px' }}>
          <Row justify="center" style={{ marginTop: '4rem' }}>
            <Col
              span={8}
              style={{
                textAlign: 'center',
                backgroundColor: '#fff',
                padding: '26px',
                minWidth: '700px',
              }}
            >
              <Typography>
                <Title style={{ minWidth: '500px' }}>Add an Organization</Title>
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

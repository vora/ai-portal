import React from 'react';
import {
  Layout,
  Content,
  Button,
  Form,
  Col,
  Typography,
  Row,
  message,
  notification,
} from '../ant';
import Footer from '../components/Footer';
import FormHeader from '../components/FormHeader';
import FormQuestion from '../components/FormQuestion';
import { useAppEnv } from './../env';
import { useHistory } from 'react-router';

const { Title } = Typography;

function AddTopic() {
  let { api } = useAppEnv();
  let history = useHistory();
  let onSubmit = async (formVal) => {
    let result = await api.post('/api/topics', formVal);
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
      string: 'Topic Name',
      val: 'name',
      type: 'type',
      required: true,
      tip:
        'e.g. Banking, Health, Insurance, Labor, Retail, Education, Law Enforcement, Media, Other',
    },
    {
      string: 'Description',
      val: 'desc',
      type: 'text-area',
      required: true,
      tip: 'A brief description about the topic',
    },
  ];

  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'hidden' }}>
      <FormHeader></FormHeader>
      <Content style={{ padding: '0 50px' }}>
        <Row justify="center" style={{ marginTop: '4rem' }}>
          <Col
            span={10}
            style={{
              textAlign: 'center',
              backgroundColor: '#fff',
              padding: '26px',
              minWidth: '700px',
            }}
          >
            <Typography>
              <Title style={{ minWidth: '500px' }}>Add a Topic</Title>
            </Typography>
            <Form
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 10 }}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onSubmit}
              onFinishFailed={onFail}
              style={{ minWidth: '1000px', overflow: 'auto' }}
            >
              {questions.map((question) => (
                <FormQuestion question={question} />
              ))}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  shape="round"
                >
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

export default AddTopic;

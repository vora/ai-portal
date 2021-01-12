import React, { useRef } from 'react';
import {
  Layout,
  Content,
  Button,
  Form,
  Col,
  Typography,
  Row,
  Steps,
  message,
} from '../ant';
import Footer from '../components/Footer';
import FormHeader from '../components/FormHeader';
import FormQuestion from '../components/FormQuestion';

import {
  QUESTIONS_CORE1,
  QUESTIONS_CORE2,
  QUESTIONS_DATASET,
  QUESTIONS_MODEL,
} from '../components/ResourceQuestions';
const { Step } = Steps;
const { Title } = Typography;

let core2Page = {
  title: 'Core 2',
  content: QUESTIONS_CORE2,
};

let datasetPage = {
  title: 'Dataset',
  content: QUESTIONS_DATASET,
};

let modelPage = {
  title: 'Model',
  content: QUESTIONS_MODEL,
};
let steps = [
  {
    title: 'Core 1',
    content: QUESTIONS_CORE1,
  },
];

function AddResource() {
  let topRef = useRef(null);
  const [form] = Form.useForm();
  const [current, setCurrent] = React.useState(0);
  const updatePages = () => {
    if (current === 0) {
      let data = form.getFieldValue();
      //if owner, add core2 Pages
      if (data['isOwner'] === 'Yes' && !steps.includes(core2Page)) {
        steps.splice(1, 0, core2Page);
      }
      //add model and dataset pages if applicable
      if (data['formats'].includes('Dataset') && !steps.includes(datasetPage)) {
        steps.push(datasetPage);
      }
      //Q: what field to check for model?
      if (data['formats'].includes('Algorithm') && !steps.includes(modelPage)) {
        steps.push(modelPage);
      }
      //remove core2, model, or dataset pages if answers has changed
      if (data['isOwner'] === 'No' && steps.includes(core2Page)) {
        steps = steps.filter((value) => value !== core2Page);
      }
      if (!data['formats'].includes('Dataset') && steps.includes(datasetPage)) {
        steps = steps.filter((value) => value !== datasetPage);
      }
      if (!data['formats'].includes('Algorithm') && steps.includes(modelPage)) {
        steps = steps.filter((value) => value !== modelPage);
      }
    }
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  //next page
  const next = (values) => {
    updatePages();
    console.log(JSON.stringify(form.getFieldValue()));
    if (current === steps.length - 1) {
      message.success('Form completed!');
      console.log('answers are ', JSON.stringify(form.getFieldValue()));
    } else {
      setCurrent(current + 1);
    }
  };

  //back page
  const prev = (values) => {
    updatePages();
    setCurrent(current - 1);
  };

  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'scroll' }}>
      <FormHeader />
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
            span={16}
            style={{
              textAlign: 'center',
              backgroundColor: '#fff',
              padding: '26px',
              minWidth: '1300px',
            }}
          >
            <div ref={topRef}>
              <Typography>
                <Title style={{ minWidth: '500px' }}>Add a Resource</Title>
              </Typography>
              <p>
                Thank you for starting to upload a resource! In order to ensure
                we follow best practices from{' '}
                <a href="https://datanutrition.org/">
                  The Data Nutrition Project
                </a>
                , and help build a more responsible tech future, we have a few
                questions about your resource to finalize the process. Your
                resource will be checked by an AI Global team member and
                approved based on your responses.{' '}
              </p>
            </div>
            <Steps current={current} style={{ width: '60%', padding: '26px' }}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <Form
              labelCol={{ span: 15 }}
              wrapperCol={{ span: 11 }}
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={next}
              form={form}
              // onFinishFailed={onFail}
              style={{ minWidth: '1000px', overflow: 'auto' }}
            >
              <p>
                Not sure about some of these questions? Fill out our
                <a href="/feedback"> suggestion form </a>
                to suggest a resource or work with us to answer these fields.
              </p>
              {steps[current].content.map((question) => (
                <FormQuestion question={question} />
              ))}

              <div style={{ marginTop: '100px' }}>
                {current < steps.length - 1 && (
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Next
                    </Button>
                  </Form.Item>
                )}
                {current === steps.length - 1 && (
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                )}
                {current > 0 && (
                  <Form.Item>
                    <Button style={{ margin: '0 8px' }} onClick={prev}>
                      Previous
                    </Button>
                  </Form.Item>
                )}
              </div>
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

export default AddResource;

import React from 'react';
import {
  Layout,
  Content,
  Button,
  Input,
  Form,
  Col,
  Typography,
  DatePicker,
  Tooltip,
  Row,
} from '../ant';
import Footer from '../components/Footer';
import MultiSelectField from '../components/FormMultiSelectField';
import FormField from '../components/FormField';
import FormHeader from '../components/FormHeader';

const { TextArea } = Input;
const { Title } = Typography;

function AddResources() {
  let onSubmit = async (values) => {};
  let onFail = (values) => {};
  return (
    <Layout>
      <FormHeader />
      <Layout
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Content style={{ padding: '0 50px' }}>
          <Row justify="center" style={{ marginTop: '4rem' }}>
            <Col
              span={18}
              style={{
                textAlign: 'center',
                backgroundColor: '#fff',
                padding: '26px',
                minWidth: '700px',
              }}
            >
              <Typography>
                <Title style={{ minWidth: '500px' }}>Add a Resource</Title>
              </Typography>
              <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 10 }}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                onFinishFailed={onFail}
                style={{ minWidth: '1000px', overflow: 'auto' }}
              >
                <FormField
                  field="Name of Resource"
                  text="This is what your resource will be displayed as. Make sure capitalization and spelling is correct"
                  req="true"
                />
                <MultiSelectField
                  field="Organization Type"
                  mode="multiple"
                  options={[
                    'Industry',
                    'Academia',
                    'Government',
                    'Civil Society',
                    'Other',
                  ]}
                  text="This is the type of organization that created this resource"
                  req="true"
                />
                <MultiSelectField
                  field="Topics"
                  mode="multiple"
                  options={[
                    'Banking',
                    'Health',
                    'Labor',
                    'Retail',
                    'Education',
                    'Law Enforcement',
                    'Media',
                    'Other',
                  ]}
                  text="These are the relevant topics for this resource"
                  req="true"
                />
                <MultiSelectField
                  field="Formats"
                  mode="multiple"
                  options={[
                    'Algorithm',
                    'API',
                    'Assessment',
                    'Benchmark',
                    'Datasets',
                    'Design Tool',
                    'Education Tool',
                    'Framework',
                    'Inspection',
                    'Library',
                    'Machine Learning Tool',
                    'Podcast',
                    'Principles',
                    'Research',
                    'Software',
                    'Strategy & Implementation',
                    'Toolkit',
                    'Vision Tool',
                    'Working Groups',
                    'Workshops',
                    'Other',
                  ]}
                  text="These are the purposes of the resource"
                  req="true"
                />
                <MultiSelectField
                  field="Paths"
                  mode="multiple"
                  options={[
                    'Designer Path',
                    'Developer Path',
                    'Policymaker Path',
                    'Riskmanager Path',
                    'Explorer',
                    'Other',
                  ]}
                  text={
                    'These are the people who might find this resource relevant.'
                  }
                  req="true"
                />
                <MultiSelectField
                  field="Trust Index Categories"
                  mode="multiple"
                  options={[
                    'Explainability & Interpretability',
                    'Data Quality',
                    'Bias & Fairness',
                    'Accountability',
                    'Robustness',
                    'Other',
                  ]}
                  text="These are issues/metrics mentioned and used in this resource"
                  req="true"
                />
                <MultiSelectField
                  field="Tech/Non-Tech"
                  mode="tag"
                  options={['Technical', 'Non-Technical']}
                  text="This is whether the resource has technical or non-technical content."
                  req="true"
                />
                <Tooltip title="This is today's date">
                  <Form.Item label="Upload Date">
                    <DatePicker />
                  </Form.Item>
                </Tooltip>

                <Tooltip title="This is the date the resource was created. It can be left empty if the date is not available.">
                  <Form.Item label="Creation Date">
                    <DatePicker />
                  </Form.Item>
                </Tooltip>

                <Tooltip title="This is the date the resource was last modified. It can be left empty if the date is not available.">
                  <Form.Item label="Date Modified">
                    <DatePicker />
                  </Form.Item>
                </Tooltip>

                <Tooltip title="A brief description about the resource">
                  <Form.Item label="Description">
                    <TextArea rows={4}></TextArea>
                  </Form.Item>
                </Tooltip>

                <FormField
                  field="URL Source"
                  text="This should be a valid URL that directs to the resource."
                  req="true"
                />
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
      </Layout>
      <Footer />
    </Layout>
  );
}

export default AddResources;

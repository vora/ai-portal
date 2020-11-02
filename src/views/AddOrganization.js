import React from 'react';
import { Layout, Content, Button, Form, Col, Typography, Row } from '../ant';
import Footer from '../components/Footer';
import MultiSelectField from '../components/FormMultiSelectField';
import FormField from '../components/FormField';
import FormHeader from '../components/FormHeader';

const { Title } = Typography;

function AddOrganizations() {
  let onSubmit = async (values) => {};
  let onFail = (values) => {};
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
                <FormField
                  field="Organization Name"
                  text="The full name of the organization that you are adding"
                  req="true"
                />
                <FormField
                  field="Short Name"
                  text="Any acronyms or abbreviations for this organization"
                  req="true"
                />
                <FormField
                  field="City"
                  text="The city where this organization is located"
                  req="true"
                />
                <MultiSelectField
                  field="Country"
                  options={['A', 'B', 'C']}
                  text="Location of this organization"
                  req="true"
                />
                <FormField
                  field="URL of Logo"
                  text="A URL that stores an image of the organizaiton's logo"
                  req="true"
                />
                <FormField
                  field="Website URL"
                  text="A URL for the organization's website"
                  req="true"
                />
                <MultiSelectField
                  field="Users"
                  mode="multiple"
                  options={['Alice', 'Bob', 'Charlie']}
                  text="...."
                  req="true"
                />
                <MultiSelectField
                  field="Type"
                  mode="multiple"
                  options={[
                    'Industry',
                    'Academia',
                    'Government',
                    'Civil Society',
                    'Other',
                  ]}
                  text="The type of the organization"
                  req="true"
                />

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

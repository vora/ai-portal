import React from 'react';
import {
  QuestionCircleOutlined,
  DiffOutlined,
  ExclamationCircleOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import { Collapse, Table } from 'antd';
const { Panel } = Collapse;

function FAQ({ abridged }) {
  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <p style={{ fontWeight: 'bold', marginBottom: '0' }}>{category}</p>
      ),
      width: '15%',
    },
    {
      title: 'Objective',
      dataIndex: 'objective',
      key: 'objective',
      width: '35%',
    },
    {
      title: 'Key Concepts',
      dataIndex: 'concepts',
      key: 'concepts',
      render: (concepts) => (
        <ul>
          {concepts.map((con) => (
            <li>{con}</li>
          ))}
        </ul>
      ),
    },
  ];
  const raiCategories = [
    {
      key: '1',
      category: 'Accountability',
      objective:
        'Oversight measures and procedures required for AI systems recognizing that they are complex systems that have the capacity to change or fluctuate',
      concepts: [
        'Unintended outcomes',
        'Competency and capacity to deal with complex technologies',
        'Strong governance throughout the lifecycle of the project',
        'Privacy oversight',
        'Human in the loop',
        'Compliance with existing laws',
      ],
    },
    {
      key: '2',
      category: 'Explainability & Interpretability',
      objective:
        'Methods and techniques used for the AI system to be understood by humans',
      concepts: [
        'Breaking down the "black box" by understanding how the system operates',
        'Ability to analyze inputs including data and models',
        'Consent',
        "Users' capacity to change",
      ],
    },
    {
      key: '3',
      category: 'Data Quality & Rights',
      objective:
        'Data is a foundational aspect of all AI systems. As such, the efficacy and operation of these systems is dependent on good data.',
      concepts: [
        'How the data is being used',
        'Lineage of the dataset creation',
        'Data collection, management, and distribution practices',
        'Data quality checks',
        'Data mitigation checks',
        'Oversight of the training data',
        'Representation of data for its intended use',
      ],
    },
    {
      key: '4',
      category: 'Bias & Fairness',
      objective: 'Ensuring equity in the implementation of these systems',
      concepts: [
        'Impact on people, specifically vulnerable populations',
        'Trade-offs between different demographic groups',
        'Understanding the clear objectives of the system',
        'Training including for diversity and inclusion',
        'Safeguards for dynamic systems',
      ],
    },
    {
      key: '5',
      category: 'Robustness',
      objective:
        'Ensuring the efficacy of the underlying technology in the system',
      concepts: [
        'Compliance with good technology development practices',
        'Compliance with cybersecurity practices and procedures',
        'Capacity to deal with edge cases',
        'Model resiliency',
        'Contingency planning',
      ],
    },
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      {!abridged && (
        <h1 style={{ fontWeight: 'bold' }}>
          <QuestionCircleOutlined
            style={{ fontSize: '0.9em', color: '#1890ff' }}
          />
          &nbsp;General
        </h1>
      )}
      <div style={{ width: '100%' }}>
        <Collapse
          accordion
          defaultActiveKey={['1']}
          bordered={false}
          style={{ fontSize: '1.2em' }}
        >
          <Panel
            header={
              <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                What is the Responsible AI Community Portal?
              </p>
            }
            key="1"
            style={{ textAlign: 'start' }}
          >
            <p style={{ marginLeft: '25px' }}>
              The Responsible AI Community Portal is an evolving repository of
              reports, standards, models, government policies, datasets, and
              open-source software to inform and support responsible AI
              development. These resources are collected and classified by AI
              Global.
            </p>
          </Panel>
          <Panel
            header={
              <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                What is the purpose of this tool?
              </p>
            }
            key="2"
            style={{ textAlign: 'start' }}
          >
            <p style={{ marginLeft: '25px' }}>
              Resources are often scattered on different platforms and can be
              difficult to find. The purpose of the Community Portal is to allow
              quick and easy access to 300+ resources that bring awareness to
              ethical AI issues and how to mitigate harm of technology. By
              reducing the time it takes to search for trusted resources, our
              goal is to improve access and empower progress in this rapidly
              evolving field.
            </p>
          </Panel>
          <Panel
            header={
              <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                What can I do on this platform?
              </p>
            }
            key="3"
            style={{ textAlign: 'start' }}
          >
            <p style={{ marginLeft: '25px' }}>
              Users can browse through our selected list of resources classified
              by the AI Global team. You can search terms or apply a variety of
              filters, which include pathways you can select depending on your
              role. Anyone is able to search terms and access the resources but
              to upload a resource, users will need to{' '}
              <a href="/register">create an account</a>. You can then{' '}
              <a href="/resources/create">share the resource</a>, which will
              first be reviewed by AI Global admins before being displayed on
              the Community Portal.
            </p>
          </Panel>
          <Panel
            header={
              <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                Why should I use the Community Portal?
              </p>
            }
            key="7"
            style={{ textAlign: 'start' }}
          >
            <p style={{ marginLeft: '25px' }}>
              On the platform, you can explore resources that have been
              carefully selected by industry experts that cover a variety of
              topics, from policy to algorithmic research. You'll be able to
              drastically reduce your search time for relevant and, more
              importantly, trusted content. You'll be able to filter resources
              based upon what you're looking for and even by the role you're
              taking on. This list of resources will continue to grow overtime
              as fellow users and organizations recommend resources that must be
              approved by our moderators.
            </p>
          </Panel>
          <Panel
            header={
              <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                Why is AI Global releasing this tool?
              </p>
            }
            key="4"
            style={{ textAlign: 'start' }}
          >
            <p style={{ marginLeft: '25px' }}>
              AI Global's mission is to mitigate harm and unintended
              consequences of technology by building practical tools to support
              the responsible development of AI systems for individuals and
              teams.
            </p>
          </Panel>
          <Panel
            header={
              <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                Who is the intended audience of this tool?
              </p>
            }
            key="5"
            style={{ textAlign: 'start' }}
          >
            <p style={{ marginLeft: '25px' }}>
              This platform was built to support the community working on the
              development of AI, including developers, product designers,
              researchers, business owners, policymakers, and risk managers. Our
              objective is to engage people from different perspectives and
              roles - it is only through collective effort and knowledge can
              progress be made. That's why the Community Portal includes filters
              specified for targeted roles. By bringing resources catered to
              people from a variety of backgrounds, we can get people to work
              more effectively in developing Responsible AI.
            </p>
          </Panel>
          <Panel
            header={
              <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                Who is responsible for maintaining the resources?
              </p>
            }
            key="6"
            style={{ textAlign: 'start' }}
          >
            <p style={{ marginLeft: '25px' }}>
              AI Global moderators and administrators are continually adding and
              approving resources. We highly encourage users to upload resources
              they believe are beneficial, with our team evaluating the
              submittals prior to uploading them to the Community Portal.
            </p>
          </Panel>
          <Panel
            header={
              <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                How do I get started?
              </p>
            }
            key="8"
            style={{ textAlign: 'start' }}
          >
            <p style={{ marginLeft: '25px' }}>
              You can take a look at the resources we have and apply filters
              depending on what you're looking for.{' '}
              <a href="/resources?q=">Click to start viewing resources</a>.
            </p>
          </Panel>
        </Collapse>
      </div>

      {!abridged && (
        <div style={{ marginTop: '4rem', width: '100%' }}>
          <h1 style={{ fontWeight: 'bold' }}>
            <DiffOutlined style={{ fontSize: '0.9em', color: '#1890ff' }} />
            &nbsp;Viewing &amp; Uploading Resources
          </h1>
          <Collapse
            accordion
            defaultActiveKey={['1']}
            bordered={false}
            style={{ fontSize: '1.2em' }}
          >
            <Panel
              header={
                <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                  How do I find a resource?
                </p>
              }
              key="1"
              style={{ textAlign: 'start' }}
            >
              <p style={{ marginLeft: '25px' }}>
                You can type in relevant words into the search bar and filter by
                different types of resources. Clicking a resource’s ‘More
                Information’ button will lead to the resource’s details and
                files.
              </p>
            </Panel>
            <Panel
              header={
                <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                  How can I upload a resource?
                </p>
              }
              key="2"
              style={{ textAlign: 'start' }}
            >
              <p style={{ marginLeft: '25px' }}>
                You can upload a reousrce by filling out{' '}
                <a href="/resources/create">this form</a>. You'll first need to
                have an account and once you submit the form, your request will
                be reviewed by an AI Global moderator and then added to the
                Community Portal.
              </p>
            </Panel>
            <Panel
              header={
                <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                  What type of data formats can a resource be in?
                </p>
              }
              key="3"
              style={{ textAlign: 'start' }}
            >
              <p style={{ marginLeft: '25px' }}>
                Resources can be a URL link or a variety of file types (pdfs,
                csv, etc.).
              </p>
            </Panel>
            <Panel
              header={
                <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                  What if I do not know all the information on the form to
                  upload a resource?
                </p>
              }
              key="4"
              style={{ textAlign: 'start' }}
            >
              <p style={{ marginLeft: '25px' }}>
                You can leave the optional fields empty. If you don’t know the
                mandatory fields, you can suggest a resource on our{' '}
                <a href="/feedback">Feedback Form</a>.
              </p>
            </Panel>
            <Panel
              header={
                <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                  Do I need to be author of a resource to suggest it?
                </p>
              }
              key="5"
              style={{ textAlign: 'start' }}
            >
              <p style={{ marginLeft: '25px' }}>
                You don't need to be the author to submit the resource but as
                the upload process includes many specific questions, we suggest
                you instead fill out the <a href="/feedback">Feedback Form</a>{' '}
                with a link to the desired resource so we can approve and upload
                it.
              </p>
            </Panel>
          </Collapse>
        </div>
      )}

      {!abridged && (
        <div style={{ marginTop: '4rem', width: '100%' }}>
          <h1 style={{ fontWeight: 'bold' }}>
            <BarsOutlined style={{ fontSize: '0.9em', color: '#1890ff' }} />
            &nbsp;Design Assistant &amp; Filtering
          </h1>
          <Collapse
            accordion
            defaultActiveKey={['1']}
            bordered={false}
            style={{ fontSize: '1.2em' }}
          >
            <Panel
              header={
                <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                  What are the Responsible AI Trust Index Categories?
                </p>
              }
              key="1"
              style={{ textAlign: 'start' }}
            >
              <p style={{ marginLeft: '25px' }}>
                There are five categories of the Responsible AI Trust Index
                Categories, which are evaluated by the{' '}
                <a href="https://oproma.github.io/rai-trustindex/">
                  Design Assistant
                </a>{' '}
                by AI Global. The table below describes them in detail:
              </p>
              <Table
                columns={columns}
                dataSource={raiCategories}
                style={{ backgroundColor: 'white' }}
                pagination={false}
              />
            </Panel>
            <Panel
              header={
                <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                  What are the Roles?
                </p>
              }
              key="2"
              style={{ textAlign: 'start' }}
            >
              <p style={{ marginLeft: '25px' }}>
                The platform currently has five different resource paths, i.e.
                resources catered to five different roles users take on when
                looking for resources. These include:
                <ul style={{ marginTop: '5px' }}>
                  <li>
                    <strong>Explorer</strong>: Introductory material to those
                    new to Responsible AI
                  </li>
                  <li>
                    <strong>Designer</strong>: Intended for product designers
                  </li>
                  <li>
                    <strong>Developer</strong>: Technical resources for
                    engineers and developers
                  </li>
                  <li>
                    <strong>Policymaker</strong>: Individuals looking for
                    governance systems and regulations
                  </li>
                  <li>
                    <strong>Risk Manager</strong>: Those interested in best
                    practices and use cases
                  </li>
                </ul>
              </p>
            </Panel>
          </Collapse>
        </div>
      )}

      {!abridged && (
        <div style={{ marginTop: '4rem', width: '100%', marginBottom: '4rem' }}>
          <h1 style={{ fontWeight: 'bold' }}>
            <ExclamationCircleOutlined
              style={{ fontSize: '0.9em', color: '#1890ff' }}
            />
            &nbsp;Support
          </h1>
          <Collapse
            accordion
            defaultActiveKey={['1']}
            bordered={false}
            style={{ fontSize: '1.2em' }}
          >
            <Panel
              header={
                <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                  How do I reset my password?
                </p>
              }
              key="1"
              style={{ textAlign: 'start' }}
            >
              <p style={{ marginLeft: '25px' }}>
                You can{' '}
                <a href="https://portal.ai-global.org/login#!">
                  reset your password here
                </a>{' '}
                by typing in your username. An email to reset your password will
                be sent to the account’s email address.
              </p>
            </Panel>
            <Panel
              header={
                <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                  How can I contact support?
                </p>
              }
              key="2"
              style={{ textAlign: 'start' }}
            >
              <p style={{ marginLeft: '25px' }}>
                You can fill out this <a href="/feedback">Feedback Form</a> to
                report broken links or to give suggestions.
              </p>
            </Panel>
          </Collapse>
        </div>
      )}
    </div>
  );
}

export default FAQ;

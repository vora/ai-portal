import React from 'react';
export const EXAMPLE = {
  name: 'Where in the Word is AI? Map',
  desc:
    'An interactive web visualization and dataset with 300+ helpful and harmful AI cases worldwide',
  formats: 'Education Tool, Dataset',
  topics: [],
  organization: [],
  org_types: 'Civil Society',
  trust_index: 'Explainbility & Interpretability',
  paths: 'Policymaker Path, Risk Manager Path, Explorer Path',
  ai_system_type: 'Other',
  url: 'https://map.ai-global.org/',
  creation_date: '03/01/2020',
  modified_data: '11/15/2020',
  keywords: 'Data Visualization, Helpful AI, Harmful AI',
  version: 2.0,
  update_frequency: 'Weekly',
  license: 'Creative Commons (CC BY 4.0)',
  purpse:
    'Where in the World is AI? Map highlights helpful and harmful AI cases worldwide to start discussions around responsible AI',
  creator:
    'Martha Czernuszenko, Shrivu Shankar, Ameya Deshmukh, Colin Philips, and Lucinda Nguyen',
  contact_email: 'admin@ai-global.org',
  location: 'Austin, Texas, USA',
  fundedBy: '',
  missingInfo:
    'There is an unequal distribution of cases between North America and Europe compared to Africa and Latin America',
  qualityReview:
    'We had several external stakeholder reviews from The University of Texas and Responsible AI advisors based in Canada and the USA.',
  ethicsReview:
    'We have a civil society trust channel with responsible AI advisors that reviewed these cases.',
  intendedAudience:
    'Responsible AI Civil Society, Policymakers, Researchers, Professors',
  privacyProcedure: '',
  dataDictLink: '',
  dataCollectorOwnerRelation: 'Both are Martha Czernuszenko.',
  dataCollection:
    'Data is collected by AI Global employees from unethical AI Google Alert, Harmful AI Repository, AI & Algorithmic Incident & Controversy Repository by Charlie Pownall and other news resources.',
  infoCollected:
    'We are manually collecting data from news sources to provide a publicly accessible dataset on cases around the world. In our dataset, AI Global labels these cases as helpful and harmful.',
  externalRestrictions: 'No, the data is in a Google Sheet open to anyone.',
  sensitiveData:
    'Yes, these news articles list some personal information and business information. The news source is reporting on this story so we assume that permission was authorized for this information.',
  datasetTasks:
    'The dataset has been taught at The University of Toronto and The University of Montreal in AI ethics classes. It has also been used by working groups to discuss responsible AI. This dataset is used in the Where in the World is AI visualization?',
  datasetDemographics: 'N/A',
  individualsIdentified: 'Yes',
  isConfidential: 'Yes',
  individualsConsent:
    'We assume yes because we only use reputable sources. We assume the media asked.',
  personalInfoRemoved: 'No',
  offensiveContent:
    'Yes, there are some cases of unjust systems, racial bias and violence.',
  fieldsRelationship: 'N/A',
  numInstances: '300+',
  instances: 'Text data of news sources',
  typeInstances:
    'There is a news title and description, also city, state and country',
  completeness:
    'The dataset is not complete as helpful and harmful cases of AI occur daily. There is no sample.',
  preprocessing: 'N/A',
  rawData: 'N/A',
  sample: 'N/A',
  sampleStrategy: '',
  populationDataSource: 'N/A',
  recommendedSplit: 'N/A',
  handledCarefully: 'N/A',
  accurateRepresentation: 'N/A',
  rawOrProcessed: 'N/A',
  dataDrift: 'N/A',
  dataReuse: 'N/A',
  lifecycleState: 'Update Dateset',
  noiseDescription: 'N/A',
  dataDependency: ['N/A', 'N/A', 'N/A'],
  modelType: 'Decision Tree',
  modelInputs: 'Text of news sources',
  modelOutputs:
    'A summary of tree model, number of observations, and node information',
  modelTradeOffs: 'As bias decreases, variance increases',
  hyperparameters: '12 Branches in Decision Tree',
  modelArchitecture: '12 layers',
  modelTask: 'Classification',
  learningType: 'Supervised',
  numParameters: '24',
  modelAttributes: '',
  framework: 'PyTorch',
  modelDependencies: 'Pandas, sklearn, graphviz',
  hardwareRequirements: '8 GPUs',
  pretrainedModels: 'https://huggingface.co/bert-base-uncased',
  modelMetrics: 'Accuracy, Precision, Recall',
  removalRequest: 'Not applicable because no personal information is used',
};

export function getQuestionsCore1(topics, orgs) {
  return [
    {
      string: 'Do you own this resource (Yes/No)?',
      val: 'isOwner',
      type: 'select',
      options: [
        { name: true, label: 'Yes' },
        { name: false, label: 'No' },
      ],
      required: true,
      tip: '',
      example_ans: '',
    },
    {
      string: 'Resource Title',
      val: 'name',
      type: 'type',
      options: null,
      required: true,
      tips: '',
      example_ans: EXAMPLE.name,
    },
    {
      string: 'Resource Description',
      val: 'desc',
      type: 'text-area',
      options: null,
      required: true,
      tip: 'A short summary sentence of the resource',
      example_ans: EXAMPLE.desc,
    },
    {
      string: 'Format(s)',
      val: 'formats',
      type: 'multiple',
      options: [
        { name: 'Algorithm', label: 'Algorithm' },
        { name: 'API', label: 'API' },
        { name: 'Assessment', label: 'Assessment' },
        { name: 'Benchmark', label: 'Benchmark' },
        { name: 'Best Practices', label: 'Best Practices' },
        { name: 'Dataset', label: 'Dataset' },
        { name: 'Design Tool', label: 'Design Tool' },
        { name: 'Education Tool', label: 'Education Tool' },
        { name: 'Framework', label: 'Framework' },
        { name: 'Governance Process', label: 'Governance Process' },
        { name: 'Inspection', label: 'Inspection' },
        { name: 'Library', label: 'Library' },
        { name: 'Model', label: 'Model' },
        { name: 'Podcast', label: 'Podcast' },
        { name: 'Principles', label: 'Principle' },
        { name: 'Regulations and Laws', label: 'Regulations and Laws' },
        { name: 'Research', label: 'Principle' },
        { name: 'Software', label: 'Software' },
        { name: 'Standards', label: 'Standards' },
        {
          name: 'Strategy & Implementation',
          label: 'Strategy & Implementation',
        },

        { name: 'Toolkit', label: 'Toolkit' },
        { name: 'Vision Tool', label: 'Vision Tool' },
        { name: 'Working Groups', label: 'Working Groups' },
        { name: 'Workshop', label: 'Workshop' },
        { name: 'Other', label: 'Other' },
      ],

      required: true,
      tip:
        'Select any tags that are relevant. If we are missing a tag, please let us know.',
      example_ans: EXAMPLE.formats,
    },
    {
      string: 'Topic of Resource (Ex: Health Services, Law Enforcement)',
      val: 'topics',
      type: 'multiple',
      options: topics.map((topic) => {
        return { name: topic._id, label: topic.name };
      }),
      required: true,
      tip: 'Select any topics that are relevant',
      example_ans: EXAMPLE.topics,
    },
    {
      string: (
        <t>
          Which organization(s) is the resource from? If organization is not
          listed, please fill out this <a href="/feedback">Suggestions form</a>{' '}
          and our admins can add it.
        </t>
      ),
      val: 'organizations',
      type: 'multiple',
      options: orgs.map((org) => {
        return { name: org._id, label: org.name };
      }),
      required: true,
      tip: 'Please avoid any abbreviations or acronyms',
      example_ans: EXAMPLE.organization,
    },
    {
      string: 'What type(s) of organization(s) (Ex: Industry, Academia)',
      val: 'org_types',
      type: 'multiple',
      options: [
        { name: 'Industry', label: 'Industry' },
        { name: 'Academia', label: 'Academia' },
        { name: 'Government', label: 'Government' },
        { name: 'Civil Society', label: 'Civil Society' },
        {
          name: 'International Organization',
          label: 'International Organization',
        },
        { name: 'Other', label: 'Other' },
      ],

      required: true,
      tip:
        'If you are unsure of what the organization type is, select civil society',
      example_ans: EXAMPLE.org_types,
    },
    {
      string: 'Responsible AI Trust Index',
      val: 'trust-index',
      type: 'multiple',
      options: [
        {
          name: 'Explainability & Interpretability',
          label: 'Explainability & Interpretability',
        },
        { name: 'Data Quality', label: 'Data Quality' },
        { name: 'Bias & Fairness', label: 'Bias & Fairness' },
        { name: 'Accountability', label: 'Accountability' },
        { name: 'Robustness', label: 'Robustness' },
        { name: 'Other', label: 'Other' },
      ],
      required: true,
      tip: (
        <t>
          Learn more about our Trust Index Values
          <a href="https://ai-global.org/2020/04/28/creating-a-responsible-ai-trust-index-a-unified-assessment-to-assure-the-responsible-design-development-and-deployment-of-ai/">
            {' '}
            here
          </a>
        </t>
      ),
      example_ans: EXAMPLE.trust_index,
    },
    {
      string: 'Who is your resource intended for?',
      val: 'paths',
      type: 'multiple',
      options: [
        { name: 'Designer Path', label: 'Designer Path' },
        {
          name: 'Developer Path',
          label: 'Developer Path',
        },
        { name: 'Policymaker Path', label: 'Policymaker Path' },
        { name: 'Risk Manager Path', label: 'Risk Manager Path' },
        { name: 'Explorer Path', label: 'Explorer Path' },
        { name: 'Other', label: 'Other' },
      ],
      required: true,
      tip: '',
      example_ans: EXAMPLE.paths,
    },
    {
      string: 'Which AI System type does the resource align with?',
      val: 'ai-system-type',
      type: 'multiple',
      options: [
        {
          name: 'Intelligent Process Automation',
          label: 'Intelligent Process Automation',
        },
        {
          name: 'Image and Object Recognition',
          label: 'Image and Object Recognition',
        },
        {
          name: 'Text and Speech Analysis',
          label: 'Text and Speech Analysis',
        },
        { name: 'Advanced Data Analytics', label: 'Advanced Data Analytics' },
        { name: 'NLP/Content Generation', label: 'NLP/Content Generation' },
        { name: 'Other', label: 'Other' },
      ],
      required: true,
      tip: 'AI System type values are defined by OECD.',
      example_ans: EXAMPLE.ai_system_type,
    },
    {
      string: 'Where can we access the resource?',
      val: 'resources',
      type: 'type',
      options: null,
      required: true,
      tip: 'Please add a url or upload any files via Google Drive url.',
      example_ans: EXAMPLE.url,
    },
    {
      string: 'When was the resource created?',
      val: 'creationDate',
      type: 'date',
      options: null,
      required: true,
      tip: '',
      example_ans: '',
    },
    {
      string: 'If applicable, when was the resource modified?',
      val: 'modifiedDate',
      type: 'date',
      options: null,
      required: false,
      tip: 'If resource was not modified, enter resource created',
      example_ans: '',
    },
    {
      string: 'What version is the resource?',
      val: 'version',
      type: 'type',
      options: null,
      required: false,
      tip: 'Please list any version numbers of indicators',
      example_ans: EXAMPLE.version,
    },
    {
      string: 'How often is this resource updated?',
      val: 'updateFrequency',
      type: 'select',
      options: [
        { name: 'Weekly', label: 'Weekly' },
        { name: 'Monthly', label: 'Monthly' },
        { name: 'Annually', label: 'Annually' },
      ],
      required: false,
      tip: 'Maintenance/Update Frequency',
      example_ans: EXAMPLE.update_frequency,
    },
    {
      string: 'If applicable, are there any licenses to this resource?',
      val: 'licenseName',
      type: 'type',
      options: null,
      required: false,
      tip: 'List any licenses or acknowledgements to the resource',
      example_ans: EXAMPLE.license,
    },
    {
      string: 'Select up to 5 keywords for the resource',
      val: 'keywords',
      type: 'tags',
      options: [],
      required: true,
      tip: '',
      example_ans: EXAMPLE.keywords,
    },
  ];
}
export const QUESTIONS_CORE2 = [
  {
    string: 'What is the purpose of the resource?',
    val: 'purpose',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'A short sentence about the purpose of the resource',
    example_ans: EXAMPLE.purpose,
  },
  {
    string: 'What should this resource not be used for?',
    val: 'unrelatedTasks',
    type: 'text-area',
    options: null,
    required: false,
    tip: '',
    example_ans: null,
  },
  {
    string: 'Who created this resource? (*o*)',
    val: 'creators',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'List first and last names of any creators of resource',
    example_ans: EXAMPLE.creator,
  },
  {
    string:
      'What is the email address of one of the owners? (This information will be made publicly available on our portal))',
    val: 'contactEmail',
    type: 'type',
    options: null,
    required: false,
    tip: 'This will be publicly available in case anyone has any questions',
    example_ans: EXAMPLE.contact_email,
  },
  {
    string: 'Where was the resource made?',
    val: 'location',
    type: 'type',
    options: null,
    required: false,
    tip: 'Please list city, state, country',
    example_ans: EXAMPLE.location,
  },
  {
    string:
      'If applicable, is the resource funded by anyone or an organization?',
    val: 'fundedBy',
    type: 'type',
    options: null,
    required: false,
    tip: 'Please list any affiliations or organizations',
    example_ans: EXAMPLE.fundedBy,
  },
  {
    string: 'If applicable, does the resource have any missing information?',
    val: 'missingInfo',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Describe any missing information',
    example_ans: EXAMPLE.missingInfo,
  },
  {
    string: 'If applicable, how did you ensure quality for the resource?',
    val: 'qualityReview',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Describe any quality resources',
    example_ans: EXAMPLE.qualityReview,
  },
  {
    string:
      'If applicable, were any ethical review processes conducted (e.g., by an institutional review board)? If so, please provide a description of these review processes, including the outcomes, as well as a link or other access point to any supporting documentation.',
    val: 'ethicsReview',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Please include any outcomes and links to supporting documentation',
    example_ans: EXAMPLE.ethicsReview,
  },
  {
    string: 'Who is the intended audience?',
    val: 'intendedAudience',
    type: 'type',
    options: null,
    required: false,
    tip: 'Please list any target audiences',
    example_ans: EXAMPLE.intendedAudience,
  },
  {
    string:
      'If applicable, describe any mechanisms through which individuals can request information to be removed.',
    val: 'removalRequest',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Describe any applicable methods for de-identification',
    example_ans: EXAMPLE.removalRequest,
  },
];

export const QUESTIONS_DATASET = [
  {
    string: 'If applicable, upload data dictionary',
    val: 'dataDictLink',
    type: 'linkFile',
    options: null,
    required: true,
    tip: 'Please link to an Excel or screenshot of data dictionary',
    example_ans: '',
  },
  {
    string:
      'What is the relationship between the dataset collector and owner/manager? ',
    val: 'dataCollectorOwnerRelation',
    type: 'type',
    options: null,
    required: false,
    tip:
      'State if they are the same person or if different people and their relationship',
    example_ans: EXAMPLE.dataCollectorOwnerRelation,
  },
  {
    string: 'What is the data collection process?  (*o*)',
    val: 'dataCollection',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Describe data collection process if manual or automated and sources.',
    example_ans: EXAMPLE.dataCollection,
  },
  {
    string:
      'What information on the data is being collected, used and managed?',
    val: 'infoCollected',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Describe if data is changed and managed',
    example_ans: EXAMPLE.infoCollected,
  },
  {
    string: 'Are there any restrictions on accessing data?',
    val: 'externalRestrictions',
    type: 'type',
    options: null,
    required: true,
    tip:
      'Describe any access permissions. Either Yes and explain restrictions or No',
    example_ans: EXAMPLE.externalRestrictions,
  },
  {
    string: 'Is there sensitive data?',
    val: 'sensitiveData',
    type: 'type',
    options: null,
    required: false,
    tip:
      'Please describe any sensitive data such as personal information, business information  or classified information Sensitive Data is Data that could reveal: Racial or ethnic origin, political opinion, religious beliefs, biometric data, health data, sexual orientation, financial information, personal information',
    example_ans: EXAMPLE.sensitiveData,
  },
  {
    string: 'What are some tasks that the dataset has been used for?',
    val: 'datasetTasks',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Describe any past use cases of dataset',
    example_ans: EXAMPLE.datasetTasks,
  },
  {
    string:
      'What are subpopulations by demographics in the dataset? Are they vulnerable?',
    val: 'datasetDemographics',
    type: 'type',
    options: false,
    required: false,
    tip:
      'Describe by age, gender, race, or other categories and provide a description of their respective distributions within the dataset. There are several definitions available for the term “vulnerable populations”, the words simply imply the disadvantaged sub-segment of the community requiring upmost care, specific ancillary considerations and augmented protections in research.  The vulnerable individuals’ freedom and capability to protect one-self from intended or inherent risks is variably abbreviated, from decreased freewill to inability to make informed choices(NCBI).',
    example_ans: EXAMPLE.datasetDemographics,
  },
  {
    string:
      'Is it possible to identify individuals (i.e., one or more natural persons), either directly or indirectly (i.e., in combination with other data) from the dataset?',
    val: 'individualsIdentified',
    type: 'select',
    options: [
      { name: true, label: 'Yes' },
      { name: false, label: 'No' },
    ],
    required: false,
    tip: null,
    example_ans: EXAMPLE.individualsIdentified,
  },
  {
    string:
      'Does the dataset contain data that might be considered confidential (e.g., data that is protected by legal privilege or by doctor patient confidentiality, data that includes the content of individuals’ non-public communications)?',
    val: 'isConfidential',
    type: 'select',
    options: [
      { name: true, label: 'Yes' },
      { name: false, label: 'No' },
    ],
    required: false,
    tip: null,
    example_ans: EXAMPLE.isConfidential,
  },
  {
    string:
      "If individuals' data is included in this dataset, did those individuals consent to the collection and use of their data? If so, please describe the consent procedure.",
    val: 'individualsConsent',
    type: 'type',
    options: null,
    required: false,
    tip: 'Describe any consent procedures',
    example_ans: EXAMPLE.individualsConsent,
  },
  //TODO: form that has sub questions
  {
    string:
      "If individuals' data is included in this dataset, was this data altered to ensure higher levels of privacy?",
    val: 'personalInfoRemoved',
    type: 'select',
    options: [
      { name: 'Yes', label: 'Yes' },
      { name: 'No', label: 'No' },
    ],
    required: false,
    tip: 'Data altered to ensure higher levels of privacy',
    example_ans: EXAMPLE.personalInfoRemoved,
  },
  {
    string:
      'If yes to the previous question, please describe any privacy procedures followed with regards to this dataset (anonymization efforts, privacy protocols, suppression techniques, etc).',
    val: 'privacyProcedure',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Description of privacy procedures',
    example_ans: EXAMPLE.privacyProcedure,
  },
  {
    string:
      'Does the dataset contain data that, if viewed directly, might be offensive, insulting, threatening, or might otherwise cause anxiety?',
    val: 'offensiveContent',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Describe any warnings about the dataset',
    example_ans: EXAMPLE.offensiveContent,
  },
  {
    string: 'Which fields have explicit and implicit relationships?',
    val: 'fieldsRelationship',
    type: 'type',
    options: null,
    required: false,
    tip: '',
    example_ans: EXAMPLE.fieldsRelationship,
  },
  {
    string:
      'How many instances are there in total(of each type if appropriate)',
    val: 'numInstances',
    type: 'type',
    options: null,
    required: false,
    tip: 'If instance number will change due to updates, include “+”',
    example_ans: EXAMPLE.numInstances,
  },
  {
    string:
      'What do the instances that comprise the dataset represent (e.g., documents, unprocessed text, photos, people, countries)?',
    val: 'instances',
    type: 'type',
    options: null,
    required: false,
    tip: 'List any representations',
    example_ans: EXAMPLE.instances,
  },
  {
    string:
      'Are there multiple types of instances (e.g., movies, users, and ratings; people and interactions between them; nodes and edges)? Please provide a description',
    val: 'typeInstances',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Provide any interactions between instances',
    example_ans: EXAMPLE.typeInstances,
  },
  {
    string:
      'Does the dataset contain all possible instances or is it a sample (not necessarily random) of instances from a larger set?',
    val: 'completeness',
    type: 'type',
    options: null,
    required: false,
    tip: 'State if sample size or larger dataset.',
    example_ans: EXAMPLE.completeness,
  },
  {
    string:
      'Was any preprocessing/cleaning/labeling of the data done? If so, please provide a description.',
    val: 'labels',
    type: 'type',
    options: null,
    required: false,
    tip:
      'Were missing values filled? Was categorical data encoded? Was the dataset split or was there feature scaling?',
    example_ans: EXAMPLE.preprocessing,
  },
  {
    string:
      'If the data was processed, was the raw data saved in addition to the preprocessed/cleaned/labeled data? If yes, please provide a link to the raw data.',
    val: 'rawData',
    type: 'type',
    options: null,
    required: false,
    tip: 'Yes/No, link raw data if possible ',
    example_ans: EXAMPLE.rawData,
  },
  {
    string: 'Is your dataset a sample?',
    val: 'sample',
    type: 'select',
    options: [
      { name: true, label: 'Yes' },
      { name: false, label: 'No' },
      { name: false, label: 'N/A' },
    ],
    required: false,
    tip: '',
    example_ans: EXAMPLE.sample,
  },
  {
    string:
      'If so, what was the sampling strategy used (e.g. deterministic, probabilistic with specific sampling probabilities), and does it accurately represent the intended output?',
    val: 'sampleStrategy',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Describe sampling strategy',
    example_ans: EXAMPLE.sampleStrategy,
  },
  {
    string:
      'If the dataset is a sample, is the sample representative of the larger set (e.g., geographic coverage)?',
    val: 'populationDataSource',
    type: 'multiple-type',
    options: [
      { name: 'populationDataSource', label: 'Population Data Source' },
      {
        name: 'representLargerSet',
        label:
          'Sample truly represent the larger set: (Describe why not if applicable)',
      },
    ],
    required: false,
    tip: 'Link population data source if applicable ',
    example_ans: '',
  },
  {
    string:
      'Are there recommended data splits (e.g., training, development/validation, testing)?',
    val: 'recommendedSplit',
    type: 'type',
    options: null,
    required: false,
    tip: 'Yes, No, N/A and recommended split',
    example_ans: EXAMPLE.recommendedSplit,
  },
  {
    string:
      'Is data used in the training or implementation of this system handled with care?',
    val: 'handledCarefully',
    type: 'select',
    options: [
      { name: 'Yes', label: 'Yes' },
      { name: 'No', label: 'No' },
      { name: 'N/A', label: 'N/A' },
    ],
    required: false,
    tip: ['Yes', 'No', 'N/A'],
    example_ans: 'N/A',
  },
  {
    string:
      'Is your system trained on data that accurately represents your entire user base?',
    val: 'accurateRepresentation',
    type: 'select',
    options: [
      { name: 'Yes', label: 'Yes' },
      { name: 'No', label: 'No' },
      { name: 'N/A', label: 'N/A' },
    ],
    required: false,
    tip: 'Yes, No, N/A',
    example_ans: EXAMPLE.accurateRepresentation,
  },
  {
    string: 'Is data being used to train the system raw or processed?',
    val: 'rawOrProcessed',
    type: 'type',
    options: null,
    required: false,
    tip: 'If data is trained, please answer',
    example_ans: EXAMPLE.rawOrProcessed,
  },
  {
    string: 'Any assessment procedure for protection against data drift?',
    val: 'dataDrift',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Data drift is the sum of data changes',
    example_ans: EXAMPLE.dataDrift,
  },
  {
    string: 'Has the data been reused?',
    val: 'dataReuse',
    type: 'type',
    options: null,
    required: false,
    tip: 'State any instances of data being reused',
    example_ans: 'N/A',
  },
  {
    string: 'Which state is the dataset in the dataset lifecycle?',
    val: 'lifecycleState',
    type: 'select',
    options: [
      { name: 'Generate Schema', label: 'Generate Schema' },
      { name: 'Create Dataset', label: 'Create Dataset' },
      { name: 'Populate Dataset', label: 'Populate Dataset' },
      { name: 'Validate Dataset', label: 'Validate Dataset' },
      { name: 'Update Dataset', label: 'Update Dataset' },
      { name: 'Annihilate Dataset', label: 'Annihilate Dataset' },
    ],
    required: false,
    tip:
      'Stages include: Generate Schema, Create Dataset, Populate Dataset, Validate Dataset, Update Dataset, Annihilate Dataset',
    example_ans: EXAMPLE.lifecycleState,
  },
  {
    string:
      'Are there any errors, sources of noise, or redundancies in the dataset? (User Input)',
    val: 'noiseDescription',
    type: 'type',
    options: null,
    required: false,
    tip:
      'Some examples could be erroneous attribute values, missing or unknown attribute values',
    example_ans: EXAMPLE.noiseDescription,
  },
  {
    string:
      'Is the dataset self-contained, or does the dataset include information from upstream sources? If so, name these sources, their stability, and any known usage limitations.',
    val: 'dataDependency',
    type: 'multiple-type',
    options: [
      {
        name: 'dataContainment',
        label:
          'Description if data self-contained or dependent on upstream resources',
      },
      {
        name: 'dataConsistent',
        label:
          'Any guarantee that the data will exist and remain constant over time',
      },
      {
        name: 'archivalVersions',
        label: 'Official archival versions of the complete dataset',
      },
      {
        name: 'restrictions',
        label: 'Description on restrictions associated with external resources',
      },
    ],
    required: false,
    tip: '',
    example_ans: '',
  },
];

export const QUESTIONS_MODEL = [
  {
    string: 'What is the model type?',
    val: 'modelType',
    type: 'type',
    options: null,
    required: true,
    tip: 'Examples can include regression, neural net, random forest etc.',
    example_ans: EXAMPLE.modelType,
  },
  {
    string: 'What are the model inputs?',
    val: 'modelInputs',
    type: 'type',
    options: null,
    required: false,
    tip: 'Describe any input data',
    example_ans: EXAMPLE.modelInputs,
  },
  {
    string: 'What are the model outputs?',
    val: 'modelOutputs',
    type: 'type',
    options: null,
    required: false,
    tip: 'List any outputs',
    example_ans: EXAMPLE.modelOutputs,
  },
  {
    string: 'What are the limitations of the model?',
    val: 'modelTradeOffs',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'List any tradeoffs',
    example_ans: EXAMPLE.modelTradeOffs,
  },
  {
    string: 'What are the model hyperparameters?',
    val: 'hyperparameters',
    type: 'text-area',
    options: null,
    required: false,
    tip:
      'Learning Rate, Number of Epochs, Number of branches in decision tree, number of clusters in clustering algorithm etc.',
    example_ans: EXAMPLE.hyperparameters,
  },
  {
    string: 'What is the model architecture?',
    val: 'modelArchitecture',
    type: 'type',
    options: null,
    required: false,
    tip: '# of layers, layer types',
    example_ans: EXAMPLE.modelArchitecture,
  },
  {
    string: 'Is this model used for classification or regression?',
    val: 'modelTask',
    type: 'type',
    options: null,
    required: false,
    tip: 'Classification or Regression task',
    example_ans: EXAMPLE.modelTask,
  },
  {
    string: 'What type of learning is this model?',
    val: 'learningType',
    type: 'select',
    options: [
      { name: 'Unsupervised', label: 'Unsupervised' },
      { name: 'Supervised', label: 'Supervised' },
      { name: 'Reinforcement', label: 'Reinforcement' },
    ],
    required: false,
    tip: 'Unsupervised, Supervised, or Reinforcement Learning',
    example_ans: EXAMPLE.learningType,
  },
  {
    string: 'How many parameters are there?',
    val: 'numParameters',
    type: 'text-area',
    options: null,
    required: false,
    tip: '',
    example_ans: '',
  },
  {
    string: 'What are the model’s attributes?',
    val: 'modelAttributes',
    type: 'text-area',
    options: null,
    required: false,
    tip: '',
    example_ans: '',
  },
  {
    string: 'Which framework does the model use?',
    val: 'framework',
    type: 'type',
    options: null,
    required: false,
    tip: 'Examples: PyTorch, TensorFlow etc.',
    example_ans: EXAMPLE.framework,
  },
  {
    string: 'What are model dependencies?',
    val: 'modelDependencies',
    type: 'type',
    options: null,
    required: false,
    tip: 'List any libraries needed',
    example_ans: EXAMPLE.modelDependencies,
  },
  {
    string: ' What are hardware requirements?',
    val: 'hardwareRequirements',
    type: 'type',
    options: null,
    required: false,
    tip: 'Number of GPUs',
    example_ans: EXAMPLE.hardwareRequirements,
  },
  {
    string: 'What are other pretrained models?',
    val: 'pretrainedModels',
    type: 'type',
    options: null,
    required: false,
    tip: 'Link any pre-trained models',
    example_ans: EXAMPLE.pretrainedModels,
  },
  {
    string: 'What are the model metrics?',
    val: 'modelMetrics',
    type: 'type',
    options: null,
    required: false,
    tip: 'List any model metrics such as F1 score, accuracy etc.',
    example_ans: EXAMPLE.modelMetrics,
  },
];

module.exports.USER_ROLES = [
  'admin', // Full access
  'mod', // e.g. AI Global Employee
  'member', // Normal member
];
module.exports.RESOURCE_TYPES = [
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
  'Workshop',
];
module.exports.RESOURCE_PATHS = [
  'Designer Path',
  'Developer Path',
  'Policymaker Path',
  'Risk Manager Path',
  'Explorer Path',
];
module.exports.ORG_TYPES = [
  'Industry',
  'Academia',
  'Government',
  'Civil Society',
];
module.exports.FILE_TYPES = [
  { name: 'DOCX', ext: 'doc', app: 'Microsoft Word' },
  { name: 'CSV', ext: 'csv', app: 'Comma Separated Values' },
];
module.exports.FILE_EXTS = module.exports.FILE_TYPES.map((ft) => ft.ext);

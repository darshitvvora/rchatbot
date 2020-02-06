const config = require('./environment');

const BUCKETS = {
  CLIENT: {
    CUSTOMER: 'CUSTOMER',
    VENDOR: 'VENDOR',
    INTERNAL: 'INTERNAL',
  },
  USER: {
    NORMAL: 'NORMAL',
    ADMIN: 'ADMIN',
    EXTERNAL: 'EXTERNAL',
    CANDIDATE: 'CANDIDATE',
  },
  RESPONSE_ATTACHMENT: {
    PAN: 'Pan',
    PASSPORT: 'Passport',
    AADHAR: 'Aadhaar',
    DRIVING_LICENCE: 'DrivingLicense',
    DEGREE_CERTIFICATE: 'Degree',
    EMPLOYMENT: 'Employment',
    CIF_UNSIGNED: 'CifUnsigned',
    CIF_SIGNED: 'CifSigned',
    MISCELLANEOUS: 'Miscellaneous',
  },
  STATES: {
    CASE_CREATED: 1,
    CASE_ALLOCATED: 2,
    PENDING_FROM_CANDIDATE: 3,
    PENDING_FROM_CLIENT: 5,
    PARTIALLY_PENDING: 6,
    AUTHORIZATION_PENDING: 7,
    DOCUMENT_UPLOADED: 8,
    IN_PROGRESS: 9,
    FINAL_REPORT_SUBMITTED: 10,
    CLOSED: 11,
    SUB_CASE_CREATED: 12,
    PARTIALLY_PENDING_FROM_CANDIDATE: 16,
  },
  STATE_BUCKETS: {
    CUSTOMER: {
      PENDING: (config.BUCKETS_CUSTOMER_PENDING || '').split(',').map(Number),
      PARTIALLY_PENDING: (config.BUCKETS_CUSTOMER_PARTIALLY_PENDING || '').split(',').map(Number),
      IN_PROGRESS: (config.BUCKETS_CUSTOMER_IN_PROGRESS || '').split(',').map(Number),
      FINAL_REPORT_SUBMITTED:
      (config.BUCKETS_CUSTOMER_FINAL_REPORT_SUBMITTED || '').split(',').map(Number),
      CLOSED: (config.BUCKETS_CUSTOMER_CLOSED || '').split(',').map(Number),
    },
    VENDOR: {
      NEW: (config.BUCKETS_VENDOR_NEW || '').split(',').map(Number),
      IN_PROGRESS: (config.BUCKETS_VENDOR_IN_PROGRESS || '').split(',').map(Number),
      PARTIALLY_PENDING: (config.BUCKETS_VENDOR_PARTIALLY_PENDING || '').split(',').map(Number),
      PENDING_FROM_CLIENT: (config.BUCKETS_VENDOR_PENDING_FROM_CLIENT || '').split(',').map(Number),
      FINAL_REPORT_SUBMITTED:
      (config.BUCKETS_VENDOR_FINAL_REPORT_SUBMITTED || '').split(',').map(Number),
      CLOSED: (config.BUCKETS_VENDOR_CLOSED || '').split(',').map(Number),
    },
    INTERNAL: {

    },
  },
  SUB_CASE_STATES: {
    PENDING: 'Pending',
    SUBMITTED: 'Submitted',
    HOLD: 'Hold',
    REFUSED: 'Refused',
    CLOSED: 'Closed',
  },
  CANDIDATE_USER_ID: 2,
  CASE_CHECK_STATUS: {
    'In-Process': 'In-Process',
    Pending: 'Pending',
    Positive: 'Positive',
    Negative: 'Negative',
    Discrepant: 'Discrepant',
    NotVerifiable: 'Not Verifiable',
  },
  CHECK_TYPES: {
    Education: 'Education',
    Employment: 'Employment',
    Address: 'Address',
    Criminal_Police: 'Criminal Police',
    Employment_Reference: 'Employment Reference',
    Global_Database: 'Global Database',
    Criminal_Court_Record: 'Criminal Court Record',
    Identity: 'Identity',
    Credit_Score: 'Credit Score',
  },
  TAT_ACTIONS: {
    START: 'Start',
    STOP: 'Stop',
  },
  CLIENT_META: {
    CIF_SHARE: 'CifShare',
    CIF_SHARE_SUBJECT: 'CifShareSubject',
    CIF_SHARE_ATTACHMENTS: 'CifShareAttachments',
    ENABLE_ADMINS_IN_MAILS: 'EnableAdminsInMails',
  },
};

module.exports = BUCKETS;

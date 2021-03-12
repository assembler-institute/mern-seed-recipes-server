require("dotenv").config();
const logger = require("loglevel");

logger.enableAll();

const {
  CLIENT_URL,
  FB_CERT_TYPE,
  FB_CERT_PROJECT_ID,
  FB_CERT_PRIVATE_KEY_ID,
  FB_CERT_PRIVATE_KEY,
  FB_CERT_CLIENT_EMAIL,
  FB_CERT_CLIENT_ID,
  FB_CERT_AUTH_URI,
  FB_CERT_TOKEN_URI,
  FB_CERT_AUTH_PROVIDER_X_509_CERT_URL,
  FB_CERT_CLIENT_X_509_CERT_URL,
  PORT = 4000,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_PROJECT_ID,
  NODE_ENV = "development",
} = process.env;

const baseConfig = {
  logger: {
    warn: logger.warn,
    info: logger.info,
    error: logger.error,
    trace: logger.trace,
    debug: logger.debug,
  },
  firebase: {
    certConfig: {
      type: FB_CERT_TYPE,
      project_id: FB_CERT_PROJECT_ID,
      private_key_id: FB_CERT_PRIVATE_KEY_ID,
      private_key: FB_CERT_PRIVATE_KEY.replace(/\\n/gm, "\n"),
      client_email: FB_CERT_CLIENT_EMAIL,
      client_id: FB_CERT_CLIENT_ID,
      auth_uri: FB_CERT_AUTH_URI,
      token_uri: FB_CERT_TOKEN_URI,
      auth_provider_x509_cert_url: FB_CERT_AUTH_PROVIDER_X_509_CERT_URL,
      client_x509_cert_url: FB_CERT_CLIENT_X_509_CERT_URL,
    },
  },
};

const config = {
  development: {
    ...baseConfig,
    app: {
      PORT: PORT || 4000,
    },
    client: {
      URL: CLIENT_URL || "http://localhost:3000",
    },
    db: {
      url: `mongodb://localhost:27017/mern-recipes-dev`,
    },
  },
  test: {
    ...baseConfig,
    app: {
      PORT: PORT || 4000,
    },
    client: {
      URL: CLIENT_URL || "http://localhost:3000",
    },
    db: {
      url: `mongodb://localhost:27017/mern-recipes-test`,
    },
  },
  production: {
    ...baseConfig,
    app: {
      PORT: PORT || 4000,
    },
    client: {
      URL: CLIENT_URL || "http://localhost:3000",
    },
    db: {
      url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_PROJECT_ID}.mongodb.net/mern-recipes?retryWrites=true&w=majority`,
    },
  },
};

module.exports = config[NODE_ENV];

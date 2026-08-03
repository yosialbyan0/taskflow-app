/**
 * Environment Configuration
 * Manages environment-specific settings
 */

const environment = {
  development: {
    apiBaseUrl: 'http://localhost:3000/api',
    debug: true,
    logLevel: 'debug'
  },
  production: {
    apiBaseUrl: 'https://api.taskflow.com/api',
    debug: false,
    logLevel: 'error'
  }
};

const currentEnv = import.meta.env.MODE || 'development';
const config = environment[currentEnv] || environment.development;

export default config;

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const PORT: string = process.env.PORT || '8000';

export default {
  environment: NODE_ENV,
  port: PORT,
};

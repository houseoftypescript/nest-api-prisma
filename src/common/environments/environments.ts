const NODE_ENV: string = process.env.NODE_ENV || 'development';
const PORT: string = process.env.PORT || '3000';
const JWT_SECRET: string = process.env.JWT_SECRET || 'secret';
const SALT_OR_ROUNDS: string = process.env.SALT_OR_ROUNDS || '10';

export default {
  environment: NODE_ENV,
  port: PORT,
  jwtSecret: JWT_SECRET,
  saltOrRounds: SALT_OR_ROUNDS,
};

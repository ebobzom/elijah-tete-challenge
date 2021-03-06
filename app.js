import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import expressMongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import dotEnv from 'dotenv';
import todoRoutes from './routes/todo.routes';
import connectToDatabase from './config/mogodb.connect';

dotEnv.config();
const baseUrl = process.env.BASE_URL;

connectToDatabase();
const app = express();

// global middlewares
app.use(helmet());
app.use(expressMongoSanitize());
app.use(xss());
app.use(hpp());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(baseUrl, todoRoutes); // TODO move to env

app.use('*', (req, res) => res.status(404).json({
  status: 'error',
  message: 'client error',
}));
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => res.status(500).json({
  status: 'error',
  message: error.message,
}));

export default app;

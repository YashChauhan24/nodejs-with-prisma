import express, { Application } from 'express';
import 'dotenv/config';
import cors from 'cors';
import passport from 'passport';
import config from './config/config';
import { connectDB } from './config/db';
import router from './router/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

connectDB();

app.use('/api', router);

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});

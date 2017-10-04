// src/app

import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import app from './app';

app.use(cors());
app.use(morgan('common'));

app.listen(3000, () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGO_URL, {
    useMongoClient: true,
  });

  console.log('API listening on port 3000!');
});

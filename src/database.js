import config from 'config';
import mongoose from 'mongoose';

export const connect = async () =>
  mongoose.connect(config.get('App.database.mongoUrl'), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

export const close = async () => mongoose.connection.close();

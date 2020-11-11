const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose
      .connect(process.env.PRODUCTION_URL || process.env.MONGODB_CONNECTION_URL,
        { useFindAndModify: false, useNewUrlParser: true });
    // eslint-disable-next-line no-console
    console.log('Database connected');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

module.exports = connectToDatabase;

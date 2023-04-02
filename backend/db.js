const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.mongo_URL)
  .then(() => {
    console.log("Connected with database");
  })
  .catch((err) => {
    console.log("Getting some issue while connecting with database: ", err);
  });

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error: ', err);
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected!');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

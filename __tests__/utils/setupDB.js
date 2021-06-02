const mongoose = require('mongoose');

const setupDB = () => {
  beforeAll(async () => {
    //Connect to DB
    await mongoose
      .connect(
        'mongodb+srv://Dima:thus2289@lab2.1wxoz.mongodb.net/lab2?retryWrites=true&w=majority',
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log('DB connection successful');
      })
      .catch((err) => console.log('ERROR', err));
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupDB;

const mongoose = require('mongoose');


const connectionOfDb = () => {
  mongoose
    .connect('mongodb+srv://nafeesasanad:ennavenumo.0@cluster0.d2x7v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      throw new Error(`Could not connect to MongoDB: ${err}`);
    });
};

module.exports = connectionOfDb;


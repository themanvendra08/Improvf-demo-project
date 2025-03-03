const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  // await mongoose.connect(process.env.MONGODB_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });

  await mongoose.connect(process.env.MONGODB_URI);
};

module.exports = connection;

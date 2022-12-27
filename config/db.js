const mongoose = require("mongoose");
const config = require(".");

const connectDB = () => {
  mongoose
    .connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => {
      console.log("Database connection error");
      console.log(error.message);
    });
};

module.exports = { connectDB };

const mongoose = require("mongoose");
const env = require("./env");

const connectDatabase = async () => {
  mongoose.set("strictQuery", true);

  const connection = await mongoose.connect(env.mongodbUri, {
    autoIndex: env.nodeEnv !== "production"
  });

  console.log(`MongoDB connected: ${connection.connection.name}`);
  return connection;
};

module.exports = connectDatabase;

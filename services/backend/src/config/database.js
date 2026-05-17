const mongoose = require("mongoose");
const env = require("./env");

const connectDatabase = async () => {
  // Mongoose reads the Atlas connection string from env.mongodbUri.
  // Keeping credentials in .env avoids hardcoding secrets in source files.
  mongoose.set("strictQuery", true);

  try {
    const connection = await mongoose.connect(env.mongodbUri, {
      autoIndex: env.nodeEnv !== "production",
      serverSelectionTimeoutMS: 10000
    });

    console.log(`MongoDB Connected: ${connection.connection.host}/${connection.connection.name}`);
    return connection;
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    throw error;
  }
};

module.exports = connectDatabase;

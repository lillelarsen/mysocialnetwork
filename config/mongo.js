const mongoose = require("mongoose");

module.exports = async function() {
  try {
    await mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.info("MongoDB Connected");
  } catch (error) {
    console.error(error);
  }
};

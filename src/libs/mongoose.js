const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/blogs"


async function Connection() {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB conectado ✅");
    return mongoose;
  } catch (err) {
    console.error("Error conectando a MongoDB ❌", err);
    throw err;
  }
}

module.exports = Connection;
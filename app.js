const mongoose = require("mongoose"); // Import mongoose
require("dotenv").config(); // Load environment variables

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Parse URL
      useUnifiedTopology: true, // Optimize connection
    });
    console.log("MongoDB Connected Successfully"); // Success message
  } catch (error) {
    console.error("MongoDB Connection Failed:", error); // Error message
    process.exit(1); // Exit process
  }
};

module.exports = connectDB; // Export function

const mongoose = require("mongoose"); // Import mongoose

const userSchema = new mongoose.Schema({
  username: {
    type: String, // Data type
    required: [true, "Username is required"], // Validation
    unique: true, // Unique value
    trim: true, // Remove spaces
    minlength: [3, "Username must be at least 3 characters"], // Length check
  },
  email: {
    type: String, // Data type
    required: [true, "Email is required"], // Validation
    unique: true, // Unique value
    match: [/\S+@\S+\.\S+/, "Invalid email format"], // Regex validation
  },
  password: {
    type: String, // Data type
    required: [true, "Password is required"], // Validation
    minlength: [6, "Password must be at least 6 characters"], // Length check
  },
  createdAt: {
    type: Date, // Data type
    default: Date.now, // Default value
  },
});

const User = mongoose.model("User", userSchema); // Create model
module.exports = User; // Export model

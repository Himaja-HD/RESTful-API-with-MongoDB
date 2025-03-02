const express = require("express"); // Import express
const connectDB = require("./app"); // Import DB connection
const User = require("./userModel"); // Import model
require("dotenv").config(); // Load environment variables

const app = express(); // Initialize app
app.use(express.json()); // Parse JSON

// Connect to MongoDB
connectDB(); // Connect DB

/**
 * @route   GET /users
 * @desc    Fetch all users
 */
app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Get users
    res.json(users); // Send response
  } catch (error) {
    res.status(500).json({ error: "Server Error" }); // Error response
  }
});

/**
 * @route   GET /users/:id
 * @desc    Fetch a specific user by ObjectId
 */
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find user
    if (!user) return res.status(404).json({ error: "User not found" }); // Not found
    res.json(user); // Send response
  } catch (error) {
    res.status(400).json({ error: "Invalid User ID" }); // Invalid ID
  }
});

/**
 * @route   POST /user
 * @desc    Add a new user
 */
app.post("/user", async (req, res) => {
  try {
    const newUser = new User(req.body); // Create user
    await newUser.save(); // Save user
    res.status(201).json({ message: "User created successfully", user: newUser }); // Success
  } catch (error) {
    res.status(400).json({ error: error.message }); // Error response
  }
});

/**
 * @route   PUT /user/:id
 * @desc    Update user details by ObjectId
 */
app.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Update options
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" }); // Not found
    res.json({ message: "User updated successfully", user: updatedUser }); // Success
  } catch (error) {
    res.status(400).json({ error: "Invalid User ID or Data" }); // Error response
  }
});

/**
 * @route   DELETE /user/:id
 * @desc    Delete user by ObjectId
 */
app.delete("/user/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id); // Delete user
    if (!deletedUser) return res.status(404).json({ error: "User not found" }); // Not found
    res.json({ message: "User deleted successfully" }); // Success
  } catch (error) {
    res.status(400).json({ error: "Invalid User ID" }); // Error response
  }
});

// Start the server
const PORT = process.env.PORT || 5000; // Set port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)); // Start server

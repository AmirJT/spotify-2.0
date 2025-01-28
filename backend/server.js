require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

const app = express();

// ✅ Configure CORS to Allow Netlify
app.use(cors({
  origin: ["https://heroic-brioche-f89f8f.netlify.app", "http://localhost:3000"], // Replace with your actual Netlify frontend URL
  credentials: true
}));

app.use(express.json()); // Parse JSON request bodies

// Debugging route registration
try {
  app.use("/api/auth", require("./routes/auth"));
  console.log("Auth routes loaded");

  app.use("/api/playlist", require("./routes/playlist"));
  console.log("Playlist routes loaded");

  app.use("/api/spotify", require("./routes/spotify"));
  console.log("Spotify routes loaded");
} catch (error) {
  console.error("Error loading routes:", error.message);
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack || err.message);
  res.status(500).json({ message: "An unexpected error occurred!" });
});

// Test Database Connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
    return sequelize.sync();
  })
  .then(() => console.log("Models synced with the database."))
  .catch((err) => {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit the process if the database connection fails
  });

// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`); // Accessible remotely
});
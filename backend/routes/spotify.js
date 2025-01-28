const express = require("express");
const { getAccessToken } = require("../services/spotify"); // Import the utility function
const router = express.Router();

// Spotify Authorization Callback Route
router.get("/callback", async (req, res) => {
  const { code } = req.query; // Get the authorization code from query parameters
  if (!code) {
    return res.status(400).json({ error: "Authorization code is required" });
  }

  try {
    // Exchange the authorization code for access and refresh tokens
    const tokens = await getAccessToken(code);
    res.json({
      message: "Access token successfully retrieved",
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    });
  } catch (error) {
    console.error("Error in Spotify callback:", error.message);
    res.status(500).json({ error: "Failed to retrieve access token" });
  }
});

// Export the router
module.exports = router;
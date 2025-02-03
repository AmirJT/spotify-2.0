const express = require("express");
const { getAccessToken } = require("../services/spotify"); 
const router = express.Router();

router.get("/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ error: "Authorization code is required" });
  }

  try {
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

module.exports = router;
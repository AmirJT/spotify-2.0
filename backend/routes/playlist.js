const express = require("express");
const { generatePlaylist } = require("../controllers/playlist");
const router = express.Router();
const Playlist = require("../models/Playlist");

// Generate playlist
router.post("/generate", generatePlaylist);

// Get saved playlists for a user
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const playlists = await Playlist.findAll({ where: { userId } });
    res.json({ playlists });
  } catch (error) {
    console.error("Error fetching playlists:", error.message);
    res.status(500).json({ error: "Failed to fetch playlists." });
  }
});

module.exports = router;
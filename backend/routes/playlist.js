const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require("qs");

async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const tokenUrl = "https://accounts.spotify.com/api/token";

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await axios.post(
    tokenUrl,
    qs.stringify({ grant_type: "client_credentials" }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${authHeader}`,
      },
    }
  );
  return response.data.access_token;
}

router.post("/generate", async (req, res) => {
  console.log("POST /generate endpoint hit with body:", req.body);
  try {
    const { userId, mood, genre, activity } = req.body;
    const searchQuery = `${mood} ${genre} ${activity}`.trim();
    
    if (!searchQuery) {
      return res.status(400).json({ error: "Please provide at least one search parameter." });
    }
    
    const accessToken = await getSpotifyAccessToken();

    const spotifyResponse = await axios.get("https://api.spotify.com/v1/search", {
      params: {
        q: searchQuery,
        type: "track",
        limit: 10,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Spotify API raw response:", JSON.stringify(spotifyResponse.data, null, 2));

    const songs = spotifyResponse.data.tracks.items.map(item => ({
      title: item.name,
      artist: item.artists.map(artist => artist.name).join(", "),
      spotifyUrl: item.external_urls.spotify,
      albumArt: item.album.images[0] ? item.album.images[0].url : "",
    }));

    console.log("Mapped songs array:", songs);

    res.json({ playlist: { songs } });
  } catch (error) {
    console.error("Error generating playlist:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to generate playlist" });
  }
});

module.exports = router;
const { OpenAI } = require("openai");
const User = require("../models/User");
const Playlist = require("../models/Playlist"); 
const { searchSpotifyTrack } = require("../services/spotify"); 

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generatePlaylist = async (req, res) => {
  console.log("generatePlaylist endpoint hit!");
  const { userId, mood } = req.body;

  if (!userId || !mood) {
    return res.status(400).json({ error: "User ID and mood are required" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const prompt = `Create a playlist for someone who is feeling ${mood}. List 5 songs in the format: "Song Title - Artist".`;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }],
      max_tokens: 300,
    });

    const playlistRaw = response.choices[0]?.message?.content.trim();
    if (!playlistRaw) return res.status(500).json({ error: "Failed to generate playlist." });

    const playlistItems = playlistRaw.split("\n").map(line => {
      const [title, artist] = line.replace(/^\d+\.\s*/, "").split(" - ");
      return { title: title?.trim(), artist: artist?.trim() };
    });

    const enrichedPlaylist = await Promise.all(
      playlistItems.map(async ({ title, artist }) => {
        const spotifyData = await searchSpotifyTrack(title, artist);
        return spotifyData ? spotifyData : { title, artist, spotifyUrl: null, previewUrl: null, albumArt: null };
      })
    );

    const newPlaylist = await Playlist.create({
      name: `${mood} Playlist`, 
      description: `A playlist generated for someone feeling ${mood}.`,
      userId,
      songs: enrichedPlaylist, 
    });

    res.json({ message: "Playlist saved successfully!", playlist: newPlaylist });
  } catch (error) {
    console.error("Error generating playlist:", error.message);
    res.status(500).json({ error: "Failed to generate playlist. Please try again." });
  }
};
const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const getSpotifyToken = async () => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body["access_token"]);
    console.log("✅ Spotify Access Token Set");
  } catch (error) {
    console.error("❌ Error getting Spotify token:", error.message);
  }
};

const searchSpotifyTrack = async (songTitle, artist) => {
  try {
    const response = await spotifyApi.searchTracks(`track:${songTitle} artist:${artist}`, { limit: 1 });
    if (response.body.tracks.items.length > 0) {
      const track = response.body.tracks.items[0];
      return {
        title: track.name,
        artist: track.artists.map(a => a.name).join(", "),
        spotifyUrl: track.external_urls.spotify,
        previewUrl: track.preview_url,
        albumArt: track.album.images[0]?.url,
      };
    }
    return null;
  } catch (error) {
    console.error("❌ Error searching track on Spotify:", error.message);
    return null;
  }
};


getSpotifyToken();

module.exports = { searchSpotifyTrack };
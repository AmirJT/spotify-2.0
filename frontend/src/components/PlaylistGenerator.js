import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlaylistGenerator = () => {
  const [mood, setMood] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [savedPlaylists, setSavedPlaylists] = useState([]);
  const userId = 1; // Hardcoded user ID for now

  // Fetch saved playlists
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/playlist/user/${userId}`);
        setSavedPlaylists(response.data.playlists);
      } catch (error) {
        console.error('Failed to fetch saved playlists', error);
      }
    };

    fetchPlaylists();
  }, [userId]);

  // Generate a new playlist
  const handleGeneratePlaylist = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/playlist/generate', {
        userId,
        mood,
      });
      setPlaylist(response.data.playlist.songs); // Access songs from generated playlist
    } catch (error) {
      console.error('Failed to generate playlist', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Playlist Generator</h2>
      <div>
        <input
          type="text"
          placeholder="Enter your mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={handleGeneratePlaylist} style={{ padding: '5px 10px' }}>
          Generate Playlist
        </button>
      </div>

      {/* Generated Playlist */}
      {playlist.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Generated Playlist</h3>
          {playlist.map((song, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <strong>{song.title}</strong> by {song.artist}
              <br />
              <a href={song.spotifyUrl} target="_blank" rel="noopener noreferrer">
                Listen on Spotify
              </a>
              {song.albumArt && (
                <div>
                  <img src={song.albumArt} alt={`${song.title} album art`} style={{ maxWidth: '100px' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Saved Playlists */}
      <div style={{ marginTop: '40px' }}>
        <h3>Saved Playlists</h3>
        {savedPlaylists.length > 0 ? (
          savedPlaylists.map((savedPlaylist) => (
            <div key={savedPlaylist.id} style={{ marginBottom: '20px' }}>
              <h4>{savedPlaylist.name}</h4>
              <p>{savedPlaylist.description}</p>
              {savedPlaylist.songs.map((song, index) => (
                <div key={index} style={{ marginLeft: '20px', marginBottom: '10px' }}>
                  <strong>{song.title}</strong> by {song.artist}
                  <br />
                  <a href={song.spotifyUrl} target="_blank" rel="noopener noreferrer">
                    Listen on Spotify
                  </a>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No saved playlists found.</p>
        )}
      </div>
    </div>
  );
};

export default PlaylistGenerator;
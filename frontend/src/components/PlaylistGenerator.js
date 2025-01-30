import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './PlaylistGenerator.css';
const PlaylistGenerator = () => {
  const [mood, setMood] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [savedPlaylists, setSavedPlaylists] = useState([]);
  const userId = 1;
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
  const handleGeneratePlaylist = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/playlist/generate', {
        userId,
        mood,
      });
      setPlaylist(response.data.playlist.songs);
    } catch (error) {
      console.error('Failed to generate playlist', error);
    }
  };
  return (
    <Container className="playlist-container">
      <Card className="playlist-card p-4 shadow-lg">
        <h2 className="text-center">Playlist Generator</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Enter your mood</Form.Label>
            <Form.Control
              type="text"
              placeholder="Happy, Chill, Energetic..."
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />
          </Form.Group>
          <Button variant="success" className="w-100" onClick={handleGeneratePlaylist}>
            Generate Playlist
          </Button>
        </Form>
        {playlist.length > 0 && (
          <div className="mt-4">
            <h3>Generated Playlist</h3>
            <ListGroup>
              {playlist.map((song, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{song.title}</strong> by {song.artist}
                    <br />
                    <a href={song.spotifyUrl} target="_blank" rel="noopener noreferrer">
                      Listen on Spotify
                    </a>
                  </div>
                  {song.albumArt && <img src={song.albumArt} alt="Album Art" className="album-art" />}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
        <div className="mt-4">
          <h3>Saved Playlists</h3>
          {savedPlaylists.length > 0 ? (
            savedPlaylists.map((savedPlaylist) => (
              <Card key={savedPlaylist.id} className="mb-3 p-3">
                <h4>{savedPlaylist.name}</h4>
                <p>{savedPlaylist.description}</p>
                <ListGroup>
                  {savedPlaylist.songs.map((song, index) => (
                    <ListGroup.Item key={index}>
                      <strong>{song.title}</strong> by {song.artist}
                      <br />
                      <a href={song.spotifyUrl} target="_blank" rel="noopener noreferrer">
                        Listen on Spotify
                      </a>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            ))
          ) : (
            <p>No saved playlists found.</p>
          )}
        </div>
      </Card>
    </Container>
  );
};
export default PlaylistGenerator;
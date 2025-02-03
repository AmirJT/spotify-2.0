import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import apiBaseUrl from '../api'; 
import './PlaylistGenerator.css';

const PlaylistGenerator = () => {
  const [mood, setMood] = useState('');
  const [genre, setGenre] = useState('');
  const [activity, setActivity] = useState('');
  const [generatedPlaylist, setGeneratedPlaylist] = useState([]);
  const [savedPlaylists, setSavedPlaylists] = useState([]);
  const userId = 1; 

  useEffect(() => {
    const fetchSavedPlaylists = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/playlist/user/${userId}`);
        console.log('Fetch saved playlists response:', response.data);
        setSavedPlaylists(response.data.playlists || []);
      } catch (error) {
        console.error('Failed to fetch saved playlists:', error.response?.data || error.message);
      }
    };
    fetchSavedPlaylists();
  }, [userId]);

  const handleGeneratePlaylist = async () => {
    try {
      console.log('Attempting to generate playlist with:', { userId, mood, genre, activity });
      const response = await axios.post(`${apiBaseUrl}/api/playlist/generate`, {
        userId,
        mood,
        genre,
        activity,
      });
      console.log('Generate playlist response:', response.data);
      setGeneratedPlaylist(response.data.playlist?.songs || []);
    } catch (error) {
      console.error('Failed to generate playlist:', error.response?.data || error.message);
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
          <Form.Group className="mb-3">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Pop, Rock, Hip-Hop..."
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Activity Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Workout, Studying, Relaxing..."
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            />
          </Form.Group>
          <Button variant="success" className="w-100" onClick={handleGeneratePlaylist}>
            Generate Playlist
          </Button>
        </Form>

        {generatedPlaylist.length > 0 && (
          <div className="mt-4">
            <h3>Generated Playlist</h3>
            <ListGroup>
              {generatedPlaylist.map((song, index) => (
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
            savedPlaylists.map((playlist) => (
              <Card key={playlist.id} className="mb-3 p-3">
                <h4>{playlist.name}</h4>
                <p>{playlist.description}</p>
                <ListGroup>
                  {playlist.songs.map((song, index) => (
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
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

// Services
import * as gameService from '../../services/gameService';

const GameForm = ({ handleAddGame, handleUpdateGame }) => {
  const { gameId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    platform: '',
    genre: '',
  });

  useEffect(() => {
    const fetchGame = async () => {
      const gameData = await gameService.show(gameId);
      setFormData(gameData);
    };
    // only fetch when editing an existing game
    if (gameId) fetchGame();
    // reset the form when leaving the edit page
    return () => setFormData({ name: '', platform: '', genre: '' });
  }, [gameId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (gameId) {
      handleUpdateGame(gameId, formData);
    } else {
      handleAddGame(formData);
    }
  };

  return (
    <main>
      <h1>{gameId ? 'Edit Game' : 'New Game'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name-input'>Name</label>
        <input
          required
          type='text'
          name='name'
          id='name-input'
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor='platform-input'>Platform</label>
        <input
          required
          type='text'
          name='platform'
          id='platform-input'
          value={formData.platform}
          onChange={handleChange}
        />
        <label htmlFor='genre-input'>Genre</label>
        <input
          required
          type='text'
          name='genre'
          id='genre-input'
          value={formData.genre}
          onChange={handleChange}
        />
        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
};

export default GameForm;
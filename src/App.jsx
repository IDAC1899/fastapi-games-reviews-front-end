import { useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';

// Components
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard'
import Landing from './components/Landing/Landing'
import GameList from './components/GameList/GameList';
import GameDetails from './components/GameDetails/GameDetails';
import GameForm from './components/GameForm/GameForm';
import ReviewForm from './components/ReviewForm/ReviewForm';

// Context
import { UserContext } from './contexts/UserContext';

// Services
import * as gameService from './services/gameService';

const App = () => {
  const { user } = useContext(UserContext)
  const [games, setGames] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function getAllGames() {
      try {
        const allGames = await gameService.index();
        setGames(allGames)
      } catch (error) {
        console.log(error)
      }
    }
    getAllGames()
  }, [])

  const handleAddGame = async (formData) => {
    const newGame = await gameService.create(formData)
    setGames([newGame, ...games])
    navigate('/games')
  }

  // gameId comes from the url as a string, game.id is a number
  const handleUpdateGame = async (gameId, formData) => {
    const updatedGame = await gameService.update(gameId, formData)
    setGames(games.map((game) => (game.id === Number(gameId) ? updatedGame : game)))
    navigate(`/games/${gameId}`)
  }

  const handleDeleteGame = async (gameId) => {
    try {
      await gameService.delete(gameId)
      setGames(games.filter((game) => game.id !== Number(gameId)))
      navigate('/games')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing/> } />

        {
          user ? (
            <>
              <Route path='/games' element={<GameList games={games}/>}/>
              <Route path='/games/new' element={<GameForm handleAddGame={handleAddGame}/>}/>
              <Route path='/games/:gameId' element={<GameDetails handleDeleteGame={handleDeleteGame}/>}/>
              <Route path='/games/:gameId/edit' element={<GameForm handleUpdateGame={handleUpdateGame}/>}/>
              <Route path='/games/:gameId/reviews/:reviewId/edit' element={<ReviewForm />}/>
            </>
          ) : (
            <>
              <Route path='/sign-up' element={<SignUpForm />} />
              <Route path='/sign-in' element={<SignInForm />} />
            </>
          )
        }
      </Routes>
    </>
  );
};

export default App;
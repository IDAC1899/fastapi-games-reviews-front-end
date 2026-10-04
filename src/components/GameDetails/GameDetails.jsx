import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';

// Context
import { UserContext } from '../../contexts/UserContext';

// Services
import * as gameService from '../../services/gameService';
import * as reviewService from '../../services/reviewService';

// Components
import ReviewForm from '../ReviewForm/ReviewForm';

export default function GameDetails({ handleDeleteGame, refreshGames }) {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  const { user } = useContext(UserContext);

  // the token stores the user's id as a string in "sub"
  const currentUserId = Number(user.sub);

  useEffect(() => {
    async function getGame() {
      try {
        const gameData = await gameService.show(gameId);
        setGame(gameData);
      } catch (error) {
        console.log(error);
      }
    }

    getGame();
  }, [gameId]);

  const handleAddReview = async (formData) => {
    const newReview = await reviewService.create(gameId, formData);
    setGame({ ...game, reviews: [...game.reviews, newReview] });
    // keep the review count on the games list in sync
    refreshGames();
  };

  const handleDeleteReview = async (reviewId) => {
    await reviewService.delete(reviewId);
    setGame({
      ...game,
      reviews: game.reviews.filter((review) => review.id !== reviewId),
    });
    // keep the review count on the games list in sync
    refreshGames();
  };

  if (!game) return <main>Loading ...</main>;

  return (
    <main>
      <section>
        <header>
          <p>{`${game.platform} · ${game.genre}`}</p>
          <h1>{game.name}</h1>
          <p>{`Added by ${game.user.username}`}</p>
          {game.user.id === currentUserId && (
            <>
              <Link to={`/games/${gameId}/edit`}>Edit</Link>
              <button onClick={() => handleDeleteGame(gameId)}>Delete</button>
            </>
          )}
        </header>
      </section>
      <section>
        <h2>Reviews</h2>
        <ReviewForm handleAddReview={handleAddReview} />

        {!game.reviews.length && <p>There are no reviews.</p>}

        {game.reviews.map((review) => (
          <article key={review.id}>
            <header>
              <p>{`${review.user.username} rated it ${review.rating}/10`}</p>
              {review.user.id === currentUserId && (
                <>
                  <Link to={`/games/${gameId}/reviews/${review.id}/edit`}>Edit</Link>
                  <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                </>
              )}
            </header>
            <p>{review.content}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
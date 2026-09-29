import { Link } from 'react-router';

export default function GameList({ games }) {
  return (
    <main>
      <h1>Games</h1>
      {!games.length && <p>There are no games yet.</p>}
      {games.map((game) => (
        <Link key={game.id} to={`/games/${game.id}`}>
          <article>
            <header>
              <h2>{game.name}</h2>
              <p>{`${game.platform} · ${game.genre}`}</p>
            </header>
            <p>{`Added by ${game.user.username} · ${game.reviews.length} reviews`}</p>
          </article>
        </Link>
      ))}
    </main>
  );
}
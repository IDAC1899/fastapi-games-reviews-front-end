# Game Reviews (Front End)

A React front end for the Game Reviews API. Users can add the games they play, rate them out of 10 and read what everyone else thinks.

Back end repo: [fastapi-games-reviews](https://github.com/IDAC1899/fastapi-games-reviews)

## Features

- Sign up, sign in and sign out (JWT stored in localStorage)
- Browse all games with their platform, genre and review count
- Add a game, and edit or delete it if you added it
- Write a review with a rating out of 10, and edit or delete your own reviews
- Dashboard showing the games you've added

## Technologies Used

- React (Vite)
- React Router
- Context API for the signed-in user
- Fetch API with service files for each resource

## Getting Started

1. Install packages:
```bash
   npm install
```
2. Create a `.env` file in the root:
```
   VITE_BACK_END_SERVER_URL=http://localhost:8000/api
```
3. Make sure the back end is running, then start the app:
```bash
   npm run dev
```
4. Open http://localhost:5173. Seeded users all have the password `123`.
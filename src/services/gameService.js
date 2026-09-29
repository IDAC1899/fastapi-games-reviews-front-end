// src/services/gameService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/games`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (gameId) => {
  try {
    const res = await fetch(`${BASE_URL}/${gameId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (gameFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async (gameId, gameFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${gameId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteGame = async (gameId) => {
  try {
    // delete sends back 204 with no body, so no res.json()
    await fetch(`${BASE_URL}/${gameId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  index,
  show,
  create,
  update,
  deleteGame as delete,
};
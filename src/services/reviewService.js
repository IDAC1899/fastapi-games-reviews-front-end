// src/services/reviewService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

const show = async (reviewId) => {
  try {
    const res = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (gameId, reviewFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/games/${gameId}/reviews`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async (reviewId, reviewFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteReview = async (reviewId) => {
  try {
    // delete sends back 204 with no body, so no res.json()
    await fetch(`${BASE_URL}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  show,
  create,
  update,
  deleteReview as delete,
};
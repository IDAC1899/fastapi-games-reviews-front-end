import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

// Services
import * as reviewService from '../../services/reviewService';

const ReviewForm = ({ handleAddReview }) => {
  const { gameId, reviewId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ content: '', rating: 5 });

  useEffect(() => {
    const fetchReview = async () => {
      const reviewData = await reviewService.show(reviewId);
      setFormData(reviewData);
    };
    // only fetch when editing an existing review
    if (reviewId) fetchReview();
  }, [reviewId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (gameId && reviewId) {
      await reviewService.update(reviewId, formData);
      navigate(`/games/${gameId}`);
    } else {
      handleAddReview(formData);
    }
    setFormData({ content: '', rating: 5 });
  };

  return (
    <form onSubmit={handleSubmit}>
      {reviewId && <h1>Edit Review</h1>}
      <label htmlFor='content-input'>Your review:</label>
      <textarea
        required
        type='text'
        name='content'
        id='content-input'
        value={formData.content}
        onChange={handleChange}
      />
      <label htmlFor='rating-input'>Rating (1-10):</label>
      <input
        required
        type='number'
        min='1'
        max='10'
        name='rating'
        id='rating-input'
        value={formData.rating}
        onChange={handleChange}
      />
      <button type='submit'>{reviewId ? 'UPDATE REVIEW' : 'SUBMIT REVIEW'}</button>
    </form>
  );
};

export default ReviewForm;
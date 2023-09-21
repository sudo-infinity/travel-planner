import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createTrip } from '../api/trips';

const TripForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.user_id = localStorage.getItem("id")
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      await createTrip(data);
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="trip-form">
      { error ? <h3 className="error">{error}</h3> : null}
      {/* <label htmlFor="apiKey">API KEY</label>
      <input type="password" required {...register('apiKey', { required: true })}  /> */}
      <label htmlFor="title">Title</label>
      <input required {...register('title', { required: true })} />
      <label htmlFor="location">Location</label>
      <input required {...register('location', { required: true })} />
      {/* <label htmlFor="comments">Comments</label> */}
      {/* <textarea name="comments" rows={3} {...register('test', { required: true })}></textarea> */}
      <label htmlFor="description">Description</label>
      <textarea rows={3} {...register('description', { required: true })}></textarea>
      <label htmlFor="startDate">Visit Date</label>
      <input name="startDate" type="date" required {...register('startDate', { required: true })} />
      <label htmlFor="endDate">Visit Date</label>
      <input name="endDate" type="date" required {...register('endDate', { required: true })} />
      <button disabled={loading}>{loading ? 'Loading...' : 'Create Trip'}</button>
    </form>
  );
};

export default TripForm;
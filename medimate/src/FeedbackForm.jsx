import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const response = await axios.post('http://localhost:5000/feedback', data);
      setSubmitSuccess(true);
      setSubmitting(false);
      
      reset();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitting(false);
    }
  };

  return (
    <div className="feedback-form">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <span className="invalid-feedback">Name is required</span>}
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <span className="invalid-feedback">Email is required</span>}
        </div>
        <div className="mb-3">
          <textarea
            placeholder="Message"
            {...register("message", { required: true })}
            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
          ></textarea>
          {errors.message && <span className="invalid-feedback">Message is required</span>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {submitSuccess && <div className="submit-success">Feedback submitted successfully!</div>}
    </div>
  );
};

export default FeedbackForm;

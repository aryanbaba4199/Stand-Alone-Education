import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { FiBook, FiDollarSign } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import { adminApi, posterFunction } from '@/Api';
import Swal from 'sweetalert2';

const CourseForm = ({setOpen}) => {
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    fees: 0,
    charge: 0,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await posterFunction(adminApi.course, formData);
      Swal.fire({
        title: 'Course Saved!',
        text: 'Your course has been successfully saved.',
        icon:'success',
        confirmButtonText: 'Close'
      })
      setOpen(false);
    } catch (error) {
        Swal.fire({
          title: 'Error Saving Course!',
          text: 'Failed to save your course. Please try again.',
          icon:'error',
          confirmButtonText: 'Close'
        });
      console.error('Error saving course:', error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <Typography variant="h4" component="h1" className="mb-6 text-center">
        <FiBook className="text-blue-500 text-3xl mb-2" /> Add New Course
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-4 mt-8 px-8">
        <div>
          <TextField
            fullWidth
            label="Course Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter course name"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <FiBook className="text-gray-500 mr-4" />
              ),
            }}
          />
        </div>

        <div>
          <TextField
            fullWidth
            label="Duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter duration"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <FiBook className="text-gray-500 mr-4" />
              ),
            }}
          />
        </div>

        <div>
          <TextField
            fullWidth
            label="Fees"
            name="fees"
            value={formData.fees}
            type='number'
            onChange={handleChange}
            placeholder="Enter fees"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <FaRupeeSign className="text-gray-500 mr-4" />
              ),
            }}
          />
        </div>

        <div>
          <TextField
            fullWidth
            label="Charge"
            name="charge"
            value={formData.charge}
            onChange={handleChange}
            placeholder="Enter charge amount"
            variant="outlined"
            type="number"
            InputProps={{
              startAdornment: (
                <FaRupeeSign className="text-gray-500 mr-4" />
              ),
            }}
          />
        </div>

        <button
          type="submit"
          
         
          className="mt-4 text-center w-full bg-gray-600 text-white p-1 rounded-md hover:bg-gray-800"
        >
          Save Course
        </button>
      </form>
    </div>
  );
};

export default CourseForm;

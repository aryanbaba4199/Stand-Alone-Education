import { adminApi, posterFunction } from '@/Api';
import React, { useState } from 'react';
import { FiVideo, FiSave } from 'react-icons/fi';
import Swal from 'sweetalert2';

const VideoForm = ({setOpen}) => {
  const [formData, setFormData] = useState({
    title: '',
    link: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleClick = async () => {
    try {
      await posterFunction(adminApi.uploadVideo, formData);
      Swal.fire({
        title: 'Video Saved!',
        text: 'Your video has been successfully saved.',
        icon:'success',
        confirmButtonText: 'Close'
      })
      setOpen(false);
    } catch (e) {
        Swal.fire({
            title: 'Error Saving Video!',
            text: 'Failed to save your video. Please try again.',
            icon:'error',
            confirmButtonText: 'Close'
        });
      console.error('Failed to save video:', e);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex items-center mb-4">
        <FiVideo className="text-blue-500 text-3xl mr-2" />
        <h1 className="text-2xl font-bold text-gray-700">Video Form</h1>
      </div>

      {/* Video Title Input */}
      <div className="w-full mb-4">
        <label htmlFor="title" className="block text-gray-600 mb-1">
          Video Title
        </label>
        <input
          type="text"
          id="title"
          onChange={handleChange}
          value={formData.title}
          placeholder="Enter video title"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Video Link Input */}
      <div className="w-full mb-6">
        <label htmlFor="link" className="block text-gray-600 mb-1">
          Video Link
        </label>
        <input
          type="text"
          id="link"
          onChange={handleChange}
          value={formData.link}
          placeholder="Paste the video link here"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700"
      >
        <FiSave className="mr-2 text-lg" />
        Save Video
      </button>
    </div>
  );
};

export default VideoForm;

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { FiBook, FiDollarSign } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import { adminApi, posterFunction, getterFunction } from "@/Api";
import Swal from "sweetalert2";

const CourseForm = ({ setOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    fees: 0,
    charge: 0,
    category: "",
    subCategory: "",
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getterFunction(adminApi.category);
      setCategories(res); // Assuming response is an array of category objects
    } catch (error) {
      console.error("Error fetching categories:", error);
      Swal.fire("Error", "Failed to fetch categories.", "error");
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const res = await getterFunction(
        `${adminApi.subCategory}?categoryId=${categoryId}`
      );
      setSubCategories(res); // Assuming response is an array of subcategory objects
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      Swal.fire("Error", "Failed to fetch subcategories.", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value, // For category, this will store categoryId
      ...(name === "category" && { subCategory: "" }), // Reset subcategory if category changes
    }));

    if (name === "category") {
      fetchSubCategories(value); // Assuming value is the categoryId
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, duration, fees, charge, category, subCategory } = formData;

    if (!name || !duration || !fees || !charge || !category || !subCategory) {
      Swal.fire("Error", "Please fill all required fields.", "error");
      return;
    }

    try {
      await posterFunction(adminApi.course, formData);
      Swal.fire("Success", "Course saved successfully.", "success");
      setOpen(false);
    } catch (error) {
      console.error("Error saving course:", error);
      Swal.fire(
        "Error",
        "Failed to save the course. Please try again.",
        "error"
      );
    }
  };

  const createCategory = async () => {
    const newCategory = prompt("Enter new category name:");
    if (!newCategory) return;

    try {
      await posterFunction(adminApi.category, { name: newCategory });
      Swal.fire("Success", "Category created successfully.", "success");
      fetchCategories();
    } catch (error) {
      console.error("Error creating category:", error);
      Swal.fire("Error", "Failed to create category.", "error");
    }
  };

  const createSubCategory = async () => {
    if (!formData.category) {
      Swal.fire("Error", "Please select a category first.", "error");
      return;
    }

    const newSubCategory = prompt("Enter new subcategory name:");
    if (!newSubCategory) return;

    const subData = {
      name: newSubCategory,
      categoryId: formData.category, // Send categoryId here
    };

    try {
      await posterFunction(adminApi.subCategory, subData);
      Swal.fire("Success", "Subcategory created successfully.", "success");
      fetchSubCategories(formData.category);
    } catch (error) {
      console.error("Error creating subcategory:", error);
      Swal.fire("Error", "Failed to create subcategory.", "error");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <Typography variant="h4" component="h1" className="mb-6 text-center">
        <FiBook className="text-blue-500 text-3xl mb-2" /> Add New Course
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-4 mt-8 px-8">
        <TextField
          fullWidth
          label="Course Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter course name"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Enter duration"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Fees"
          name="fees"
          value={formData.fees}
          type="number"
          onChange={handleChange}
          placeholder="Enter fees"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Charge"
          name="charge"
          value={formData.charge}
          type="number"
          onChange={handleChange}
          placeholder="Enter charge amount"
          variant="outlined"
        />

        <FormControl fullWidth variant="outlined">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            label="Category"
          >
            <MenuItem value="" disabled>
              Select a category
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" disabled={!formData.category}>
          <InputLabel>Subcategory</InputLabel>
          <Select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            label="Subcategory"
          >
            <MenuItem value="" disabled>
              Select a subcategory
            </MenuItem>
            {subCategories.map((subCategory) => (
              <MenuItem key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="flex justify-between items-center gap-4">
          <Button variant="outlined" color="primary" onClick={createCategory}>
            Create Category
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={createSubCategory}
          >
            Create Subcategory
          </Button>
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

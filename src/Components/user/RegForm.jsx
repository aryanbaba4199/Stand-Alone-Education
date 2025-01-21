"use client";
import React, { useState, useEffect } from "react";
import { FaUser, FaMobileAlt, FaMapMarkerAlt, FaLock } from "react-icons/fa";
import { MenuItem, TextField, Button, Dialog } from "@mui/material";
import axios from "axios";
import { adminApi, getterFunction, posterFunction, userApi } from "@/Api";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    degree: "",
    studyIn: "",
    address: "",
    countryCode: "",
    password: "",
    parent: "",
  });

  const router = useRouter();
  const [course, setCourse] = useState([]);
  const [cities, setCities] = useState([]);


  useEffect(() => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        const countryCode = `+${response.data.country_calling_code.replace(
          "+",
          ""
        )}`;
        setFormData((prev) => ({ ...prev, countryCode }));
      })
      .catch((error) => console.error("Error fetching country code:", error));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
          .then((res) => {
            setFormData((prev) => ({
              ...prev,
              address: res.data.display_name,
            }));
          })
          .catch((err) => console.error("Error fetching address:", err));
      },
      (error) => console.error("Error with geolocation:", error)
    );
    fetchCourse();
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const res = await getterFunction(adminApi.city);

      setCities(res);
      setFormData((prev) => ({ ...prev, city: res[0].cityName }));
    } catch (e) {
      console.error("Error in getting cities", e);
    }
  };

  console.log(cities);

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setFormData((prev) => ({
      ...prev,
      city: e.target.value,
    }));
    fetchCities(stateName);
  };

  

  const fetchCourse = async () => {
    try {
      const res = await getterFunction(adminApi.course);
      setCourse(res);
      console.log(res);
    } catch (err) {
      console.error("Error fetching course:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    console.log(formData);
    try {
      const res = await posterFunction(userApi.registration, formData);
      console.log(res);
      Swal.fire({
        title: "Registration Successful!",
        text: "Your form has been submitted successfully.",
        icon: "success",
        confirmButtonText: "Close",
      });
      localStorage.setItem("token", res.token);
      localStorage.setItem("userType", res.userType);
      router.push("/");
    } catch (err) {
      Swal.fire({
        title: "Error in Submission!",
        text: err,
        icon: "error",
        confirmButtonText: "Close",
      });
      console.error("Error in submission :", err);
    }
  };

  return (
    <>
      <div className=" bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full "
        >
          <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
            {/* Student Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Student Name
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border-none outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Mobile Number
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <FaMobileAlt className="text-gray-400 mr-2" />
                <span className="text-gray-700 mr-2">
                  {formData.countryCode}
                </span>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className="w-full border-none outline-none bg-transparent"
                  required
                  maxLength={10}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full border-none outline-none bg-transparent"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Parent Number
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <FaMobileAlt className="text-gray-400 mr-2" />
                <span className="text-gray-700 mr-2">
                  {formData.countryCode}
                </span>
                <input
                  type="tel"
                  name="parent"
                  value={formData.parent}
                  onChange={handleChange}
                  placeholder="Enter your parents mobile number"
                  className="w-full border-none outline-none bg-transparent"
                  required
                  maxLength={10}
                />
              </div>
            </div>
            {/* Higher Passout Degree */}
            <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
                Select Passout Degree
              </label>
              <TextField
                select
                label="Higher Passout Degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                fullWidth
                required
              >
                {course.map((option) => (
                  <MenuItem key={option._id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            {/* Want to Study In */}
            <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
                Want to Prepare
              </label>
              <TextField
                select
                label="Want to Study In"
                name="studyIn"
                value={formData.studyIn}
                onChange={handleChange}
                fullWidth
                required
              >
                {course.map((option) => (
                  <MenuItem key={option._id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                City
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleStateChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              >
                <option value={cities} disabled>
                  Select a City
                </option>
                {cities.map((state, index) => (
                  <option key={index} value={state.cityName}>
                    {state.cityName}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <FaMapMarkerAlt className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full border-none outline-none bg-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center items-center">

      
          <button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4 px-8 py-2 hover:shadow-lg shadow-black bg-purple-700 text-white font-semibold rounded-md"
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
          </div>
        </form>
      </div>
      
     
    </>
  );
};

export default StudentForm;

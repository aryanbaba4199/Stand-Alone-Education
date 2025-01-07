"use client";
import React, { useState, useEffect } from "react";
import { FaUser, FaMobileAlt, FaMapMarkerAlt, FaLock } from "react-icons/fa";
import { MenuItem, TextField, Button, Dialog } from "@mui/material";
import axios from "axios";
import { adminApi, getterFunction, posterFunction, userApi } from "@/Api";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Login from "@/Components/user/Login";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    degree: "",
    studyIn: "",
    address: "",
    countryCode: "",
    password: "",
  });

  const router = useRouter();
  const [course, setCourse] = useState([]);
  const [login, setLogin] = useState(false);

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
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/");
      }
    }
  }, [login]);

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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <h1 className="text-2xl font-bold text-center mb-6">Student Form</h1>

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
              <span className="text-gray-700 mr-2">{formData.countryCode}</span>
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
                placeholder="Enter your address"
                className="w-full border-none outline-none bg-transparent"
                required
              />
            </div>
          </div>

          {/* Higher Passout Degree */}
          <div className="mb-4">
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

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </form>
      </div>
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={() => setLogin(!login)}
          className="bg-green-600 px-4 p-1 rounded-sm text-white hover:cursor-pointer hover:bg-green-700"
        >
          Log in
        </button>
      </div>
      <Dialog open={login} onClose={() => setLogin(!login)}>
        <Login setOpen={setLogin} />
      </Dialog>
    </>
  );
};

export default StudentForm;

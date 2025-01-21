import React, { useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { posterFunction, userApi } from "@/Api";
import { useRouter } from "next/navigation";

const Login = () => {
  const [formData, setFormData] = useState({ mobile: "", password: "", isLogin: true });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await posterFunction(userApi.registration, formData);
      localStorage.setItem("token", res.token);
      localStorage.setItem("userType", res.userType);
      router.push('/');
    } catch (e) {
      console.error("Error in login", e);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-[150px] opacity-40"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-gradient-to-tr from-yellow-400 to-red-500 rounded-full blur-[120px] opacity-30"></div>

      {/* Login Card */}
      <div className="z-10 w-full max-w-md p-8 bg-white shadow-2xl rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-70">
        <h1 className="text-center text-4xl font-extrabold mb-6 text-gray-800">
          Stand Alone Education
        </h1>
        <h2 className="text-center text-2xl font-semibold mb-4 text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            fullWidth
            variant="outlined"
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            inputProps={{ maxLength: 10 }}
            className="bg-gray-100 rounded-lg"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-100 rounded-lg"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 mt-4 rounded-lg hover:from-purple-600 hover:to-blue-600"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

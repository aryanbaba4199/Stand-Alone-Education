import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { posterFunction, userApi } from '@/Api';

const Login = ({setOpen}) => {
  const [formData, setFormData] = useState({ mobile: '', password: '', isLogin : true });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const res = await posterFunction(userApi.registration, formData)
        localStorage.setItem('token', res.token);
        localStorage.setItem('userType', res.userType);d
        setOpen(false);
    }catch(e){
        console.error('Error in login', e);
  
    }
    
  };

  return (
    <div className="flex items-center justify-center  bg-gray-50">
      <div className=" w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <TextField
            fullWidth
            variant="outlined"
            label="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="mb-4"
            inputProps={{ maxLength: 10 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mb-4 mt-4"
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
            color="primary"
            className="mt-4"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { adminApi, posterFunction } from "@/Api";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Loader from "../Loader";
const CityForm = ({setOpen}) => {
  const [formData, setFormData] = useState({
    cityName: "",
    cityCode: "",
    state: "",
  });

  const [states, setStates] = useState([]); // List of states
  const [cities, setCities] = useState([]); // List of cities for selected state
  const [laoder, setLoader] = useState(false);

  // Fetch states for India
  const fetchStates = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ country: "India" }),
        }
      );
      const data = await response.json();
      if (data.error) throw new Error(data.msg || "Error fetching states.");
      setStates(data.data.states); // Assuming states are returned in `data.data.states`
    } catch (error) {
      console.error("Error fetching states:", error.message);
    }finally{
        setLoader(false);
    }
  };

  // Fetch cities based on selected state
  const fetchCities = async (stateName) => {
    setLoader(true);
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: "India",
            state: stateName,
          }),
        }
      );
      const data = await response.json();
      if (data.error) throw new Error(data.msg || "Error fetching cities.");
      setCities(data.data); // Assuming cities are returned in `data.data`
    } catch (error) {
      console.error("Error fetching cities:", error.message);
    }finally{
        setLoader(false);
    }
  };

  // Handle state change
  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setFormData((prev) => ({
      ...prev,
      state: stateName,
      cityName: "",
      cityCode: "",
    }));
    fetchCities(stateName);
  };

  // Handle city selection
  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setFormData((prev) => ({
      ...prev,
      cityName,
      cityCode: cityName ? `${Math.floor(Math.random() * 10000)}` : "",
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      await posterFunction(adminApi.city, formData); // Send formData to API
      setLoader(false);
      Swal.fire({
        title: "City Saved!",
        text: "Your city has been successfully saved.",
        icon: "success",
        confirmButtonText: "Close",
      });
      setOpen(false);
    } catch (error) {
        setLoader(false);
      Swal.fire({
        title: "Error Saving City!",
        text: error || "An error occurred while saving the city.",
        icon: "error",
        confirmButtonText: "Close",
      });
      console.error(error);
    
    }
  };

  // Fetch states on component mount
  useEffect(() => {
    fetchStates();
  }, []);

  return (
    <>
    {laoder ?  <Loader/>: 
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
    >
      <h1 className="text-2xl font-bold text-center mb-6">Create City</h1>

      {/* State Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">State</label>
        <select
          name="state"
          value={formData.state}
          onChange={handleStateChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        >
          <option value="" disabled>
            Select a state
          </option>
          {states.map((state, index) => (
            <option key={index} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      {formData.state && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">City</label>
          <select
            name="cityName"
            value={formData.cityName}
            onChange={handleCityChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          >
            <option value="" disabled>
              Select a city
            </option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* City Code */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">City Code</label>
        <input
          type="text"
          name="cityCode"
          value={formData.cityCode}
          readOnly
          className="w-full border rounded-lg px-3 py-2 bg-gray-100"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
    }
    </>
  );
};

export default CityForm;

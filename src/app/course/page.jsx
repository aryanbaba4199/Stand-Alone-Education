"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { FiBook, FiDollarSign } from "react-icons/fi";
import Swal from "sweetalert2";
import { getterFunction, adminApi } from "@/Api"; // Adjust the imports as necessary
import Link from "next/link";

const Page = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getterFunction(adminApi.course);
      setCourses(response); // Assuming response is an array of courses
    } catch (error) {
      console.error("Error fetching courses:", error);
      Swal.fire("Error", "Failed to fetch courses.", "error");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <div className="col-span-full text-center">
            <Typography variant="h5" className="text-gray-600">
              No courses available
            </Typography>
          </div>
        ) : (
          courses.map((course) => (
            <Card key={course._id} className="shadow-lg rounded-lg">
              <CardContent className="p-4">
                <Typography variant="h6" className="font-bold text-lg mb-2">
                  <FiBook className="inline-block mr-2" /> {course.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="mb-4"
                >
                  Duration: {course.duration} hours
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="mb-4"
                >
                  Fee: ₹{course.fees}
                </Typography>
                <div className="font-semibold text-gray-600 mt-2">
                  <span>{course.subCategory.name}</span> |{" "}
                  <span>{course.category.name}</span>
                </div>
              </CardContent>
              <CardActions className="flex justify-center px-4">
                <Link
                href={`/coursevideos?id=${course._id}`}
                  variant="contained"
                  color="success"
                  className=" self-center align-middle px-4 bg-gradient-to-r from-purple-600 text-white text-center to-[#15892e] rounded-md p-1 hover:shadow-md shadow-black"
                  
                >
                  View Details
                </Link>
              </CardActions>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;

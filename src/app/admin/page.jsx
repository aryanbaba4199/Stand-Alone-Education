"use client";
import { adminApi, deleterFunction, getterFunction, userApi } from "@/Api";
import CityForm from "@/Components/Admin/CityForm";
import CourseForm from "@/Components/Admin/CourseForm";
import VideoForm from "@/Components/Admin/VideoForm";
import {
  Dialog,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import Loader from "@/Components/Loader";

const Admin = () => {
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [showCourse, setshowCourse] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCity, setShowCity] = useState(false);

  useEffect(() => {
    verify();
    getDashboardData();
  }, []);

  const verify = async () => {
    const token = window?.localStorage?.getItem("userType");
    if (!token) {
      router.push("/auth");
    }
  };

  const getDashboardData = async () => {
    setLoading(true);
    try {
      const data = await getterFunction(adminApi.dashboard);
      setDashboardData(data);
      console.log(data);
    } catch (e) {
      console.error("Error in getting dashboard data", e);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = (data, sheetName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${sheetName}.xlsx`);
  };
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  const handleCourseDelete = async (id) => {
    try {
      await deleterFunction(adminApi.course, id);
      Swal.fire({
        title: "Course deleted",
        text: "Your course has been successfully deleted.",
        icon: "success",
        confirmButtonText: "Close",
      });
    } catch (e) {
      Swal.fire({
        title: "Error deleting course",
        text: e,
        icon: "error",
        confirmButtonText: "Close",
      });
      console.error("Error in deleting course", e);
    }
  };

  const handleCityDelete = async (id) => {
    try {
      await deleterFunction(adminApi.city, id);
      Swal.fire({
        title: "City deleted",
        text: "Your city has been successfully deleted.",
        icon: "success",
        confirmButtonText: "Close",
      });
    } catch (e) {
      Swal.fire({
        title: "Error deleting city",
        text: e,
        icon: "error",
        confirmButtonText: "Close",
      });
      console.error("Error deleting city", e);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="p-8">
          <div className="flex gap-8 mb-8">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowVideoForm(!showVideoForm)}
            >
              Upload Video
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setshowCourse(!showCourse)}
            >
              Create Course
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowCity(!showCity)}
            >
              Create City
            </Button>
          </div>

          <Dialog open={showVideoForm} onClose={() => setShowVideoForm(false)}>
            <VideoForm setOpen={setShowVideoForm} />
          </Dialog>
          <Dialog open={showCourse} onClose={() => setshowCourse(false)}>
            <CourseForm setOpen={setshowCourse} />
          </Dialog>

          <Dialog open={showCity} onClose={() => setShowCity(false)}>
            <CityForm setOpen={setShowCity} />
          </Dialog>

          <div className="mt-8">
            <Typography
              fontWeight={700}
              fontSize={32}
              className="text-3xl font-extrabold mb-4 text-center"
            >
              Dashboard
            </Typography>

            {/* Users Table */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">
                Users : {dashboardData?.TotalUser}
              </h3>

              <TableContainer component={Paper} className="mt-4">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Mobile</TableCell>
                      <TableCell>Degree</TableCell>
                      <TableCell>Study In</TableCell>
                      <TableCell>Address</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboardData &&
                      dashboardData?.users.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.mobile}</TableCell>
                          <TableCell>{user.degree}</TableCell>
                          <TableCell>{user.studyIn}</TableCell>
                          <TableCell>{user.address}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="flex justify-end items-center mt-2">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => exportToExcel(dashboardData.users, "Users")}
                >
                  Export Users to Excel
                </Button>
              </div>
            </div>

            {/* Courses Table */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Courses</h3>
              <TableContainer component={Paper} className="mt-4">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Fees</TableCell>
                      <TableCell>Charge</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboardData &&
                      dashboardData.courses.map((course) => (
                        <TableRow key={course._id}>
                          <TableCell>{course._id}</TableCell>
                          <TableCell>{course.name}</TableCell>
                          <TableCell>{course.duration}</TableCell>
                          <TableCell>{course.fees}</TableCell>
                          <TableCell>{course.charge}</TableCell>
                          <TableCell
                            onClick={() => handleCourseDelete(course._id)}
                            className="hover:cursor-pointer"
                            color=""
                          >
                            Delete
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Available Cities</h3>
              <TableContainer component={Paper} className="mt-4">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell>State</TableCell>
                      <TableCell>Code</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboardData &&
                      dashboardData.cities &&
                      dashboardData.cities.map((course) => (
                        <TableRow key={course._id}>
                          <TableCell>{course._id}</TableCell>
                          <TableCell>{course.cityName}</TableCell>
                          <TableCell>{course.state}</TableCell>
                          <TableCell>{course.citycode}</TableCell>

                          <TableCell
                            onClick={() => handleCityDelete(course._id)}
                            className="hover:cursor-pointer"
                            color=""
                          >
                            Delete
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;

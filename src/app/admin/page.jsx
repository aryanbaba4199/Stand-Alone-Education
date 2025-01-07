"use client";
import { adminApi, getterFunction } from "@/Api";
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
import * as XLSX from "xlsx";

const Admin = () => {
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [showCourse, setshowCourse] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDashboardData();
  }, []);

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

  return (
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
      </div>

      <Dialog open={showVideoForm} onClose={() => setShowVideoForm(false)}>
        <VideoForm setOpen={setShowVideoForm} />
      </Dialog>
      <Dialog open={showCourse} onClose={() => setshowCourse(false)}>
        <CourseForm setOpen={setshowCourse} />
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
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Admin;

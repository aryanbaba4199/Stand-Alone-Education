"use client";

import { adminApi, deleterFunction, getterFunction } from "@/Api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "@/Components/Loader";
import Swal from "sweetalert2";

const Page = () => {
  const [videos, setVideos] = useState([]);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? window?.localStorage?.getItem("token")
        : null;
    if (!token) {
      router.push("/auth");
    } else {
      const userType = localStorage.getItem("userType");
      if (userType === "admin") {
        setIsAdmin(true);
      }
      setIsCheckingAuth(false);
      getVideos();
    }
  }, []);

  const getVideos = async () => {
    try {
      setLoading(true);
      const res = await getterFunction(`${adminApi.uploadVideo}`);
      setVideos(res);
      setLoading(false);
    } catch (e) {
      console.error("Error in getting videos", e);
      setLoading(false);
    }
  };

  const extractYouTubeID = (url) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.searchParams.get("v");
    } catch (e) {
      console.warn("Invalid URL:", url);
      return null;
    }
  };

  const handleDelete = async (videoId) => {
    try {
      setLoading(true);
      console.log("Delete video", videoId);
      await deleterFunction(adminApi.uploadVideo, videoId);
      Swal.fire({
        title: "Video deleted",
        text: "Your video has been successfully deleted.",
        icon: "success",
        confirmButtonText: "Close",
      });
      setLoading(false);
      getVideos();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error deleting video",
        text: "Failed to delete the video. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
      setLoading(false);
    }
  };

  if (isCheckingAuth) {
    return <p className="text-center p-4">Checking Authentication...</p>; // Loader or fallback UI
  }

  // Sort videos by rank: the video with rank 1 will come first
  const sortedVideos = [...videos].sort((a, b) => a.rank - b.rank);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sortedVideos.map((video, index) => {
              const videoID = extractYouTubeID(video.link);
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden md:w-60 md:h-64 h-auto w-full flex flex-col"
                >
                  {videoID ? (
                    <div className="relative aspect-w-16 aspect-h-9 h-48">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoID}`}
                        title={video.title}
                        allowFullScreen
                        className="w-full h-full rounded-t-lg"
                      ></iframe>
                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(video._id)}
                          className="absolute top-2 right-2 bg-red-500 p-2 rounded-full text-white hover:bg-red-700 transition duration-300"
                        >
                          <DeleteIcon />
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-red-500 text-center p-4 self-center h-48">
                      Video Removed
                    </p>
                  )}
                  <div className="p-4 flex flex-col items-center space-y-2">
                    <p className="font-semibold text-gray-700 text-center">
                      {video.title}
                    </p>

                    {isAdmin && (
                      <span
                        onClick={() => handleDelete(video._id)}
                        className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm cursor-pointer hover:bg-red-200"
                      >
                        <DeleteIcon fontSize="small" />
                        <span className="ml-2">Delete</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;

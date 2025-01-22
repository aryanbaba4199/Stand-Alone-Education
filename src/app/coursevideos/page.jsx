"use client";

import { adminApi, getterFunction } from "@/Api";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "@/Components/Loader";
import Swal from "sweetalert2";

const Page = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    console.log("calling search", id);
    if (id) {
      getVideos(id);
    }
  }, [id]);

  const getVideos = async (id) => {
    setLoading(true);
    try {
      console.log(`Loading ${id}`);
      const response = await getterFunction(`${adminApi.uploadVideo}?id=${id}`);
      console.log(response);
      setVideos(response || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
      Swal.fire("Error", "Failed to fetch videos.", "error");
    }
    setLoading(false);
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

  if (loading) {
    return <Loader />;
  }
  const sortedVideos = [...videos].sort((a, b) => a.rank - b.rank);
  return (
    <div className="p-4">
      {sortedVideos.length === 0 ? (
        <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-center text-gray-500 mb-60 font-bold text-xl">
          No videos available for this course.
        </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedVideos.map((video, index) => {
            const videoID = extractYouTubeID(video.link);
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                {videoID ? (
                  <div className="relative aspect-w-16 aspect-h-9 h-48">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoID}`}
                      title={video.title}
                      allowFullScreen
                      className="w-full h-full rounded-t-lg"
                    ></iframe>
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center bg-gray-100 text-red-500">
                    Video Removed
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {video.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;

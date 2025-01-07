'use client';

import { adminApi, getterFunction } from '@/Api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const Page = () => {
  const [videos, setVideos] = useState([]);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push('/auth');
    } else {
      setIsCheckingAuth(false);
      getVideos();
    }
  }, [])

  const getVideos = async () => {
    try {
      const res = await getterFunction(`${adminApi.uploadVideo}`);
      setVideos(res);
    } catch (e) {
      console.error('Error in getting videos', e);
    }
  };


  const extractYouTubeID = (url) => {
    try {
      const parsedUrl = new URL(url); 
      return parsedUrl.searchParams.get('v'); 
    } catch (e) {
      console.warn('Invalid URL:', url); 
      return null; 
    }
  };

  if (isCheckingAuth) {
    return <p className="text-center p-4">Checking Authentication...</p>; // Loader or fallback UI
  }

  return (
    <div className="p-4">
   
      <div className="mb-4">
        <Link href="/auth" className="text-blue-500 hover:underline">
          Go to Auth
        </Link>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map((video, index) => {
          const videoID = extractYouTubeID(video.link); 
          return (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden w-60 h-60">
              
              {videoID ? (
                <div className="aspect-w-16 aspect-h-9 h-48">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoID}`}
                    title={video.title}
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              ) : (
                <p className="text-red-500 text-center p-4 self-center h-48">Video Removed</p>
              )}
              <div className="p-1 px-4 h-12 flex items-center">
                <p className=" font-semibold text-gray-700">{video.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;

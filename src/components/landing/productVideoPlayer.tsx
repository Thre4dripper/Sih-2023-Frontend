import React, { useState, useEffect } from "react";

interface VideoPlayerProps {
  videoUrl: string;
}

const ProuctVideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const [isValidFormat, setIsValidFormat] = useState(true);

  useEffect(() => {
    const videoExtension = videoUrl.substring(videoUrl.lastIndexOf(".") + 1);
    const allowedExtensions = ["mp4", "avi", "mkv", "mov"]; // Agrega aquí las extensiones permitidas

    setIsValidFormat(allowedExtensions.includes(videoExtension));
  }, [videoUrl]);

  if (!isValidFormat) {
    return <p className="text-red-500">El formato del video no es válido.</p>;
  }

  return (
    <div className=" bg-white  md:-20 shadow-2xl ring-1 ring-gray-900/10">
      <video className="w-full h-full rounded-lg shadow-lg" autoPlay loop muted>
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/avi" />
        <source src={videoUrl} type="video/mkv" />
        Cannot play video.
      </video>
    </div>
  );
};

export default ProuctVideoPlayer;

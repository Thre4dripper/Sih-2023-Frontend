import { useEffect, useRef } from "react";

export const VideoPlayer: React.FC<{
  stream?: MediaStream;
  classNames: string;
}> = ({ stream, classNames }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);
  return (
    <video
      data-testid="peer-video"
      className={`${classNames}`}
      ref={videoRef}
      autoPlay
      muted={true}
    />
  );
};

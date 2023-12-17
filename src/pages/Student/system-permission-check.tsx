import AudioCheck from "@/components/system-permission-check/audio-check";
import InternetCheck from "@/components/system-permission-check/internet-check";
import LocationPermission from "@/components/system-permission-check/location-permission";
import ScreenRecordingCheck from "@/components/system-permission-check/screen-recording-check";
import VideoCheck from "@/components/system-permission-check/video-check";
import { Button } from "@/components/ui/button";

const SystemPermissionCheck = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl text-center">System Permission Check</h1>
      <div className="grid grid-cols-1 gap-4 mt-8">
        <AudioCheck />
        <VideoCheck />
        <ScreenRecordingCheck />
        <LocationPermission />
        <InternetCheck />
      </div>
      <Button className="mt-8">Start Exam</Button>
    </div>
  );
};

export default SystemPermissionCheck;

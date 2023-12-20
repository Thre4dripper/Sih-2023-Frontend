import { accuracyThreshold, poseAccuracyThreshold } from "@/constants/utils";
import { peer } from "@/lib/socket/peer";
import { ws } from "@/lib/socket/ws";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as blazePose from "@tensorflow-models/pose-detection";x
import * as posenet from "@tensorflow-models/posenet";
import "@tensorflow/tfjs";
import throttle from "lodash.throttle";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

var count_facedetect = 0;
interface IProps {
  className?: string;
}

export const ObjectDetection = ({ className }: IProps) => {
  const videoRef: any = useRef();
  const { id } = useParams();

  const detectFrame = (video: any, model: any) => {
    model.detect(video).then((predictions: any) => {
      renderPredictions(predictions);
      // requestAnimationFrame(() => {
      //   detectFrameThrottle.current(video, model);
      // });
    });
  };

  const detectPose = (video: any, model: any) => {
    model.estimateSinglePose(video).then((pose: any) => {
      EarsDetect(pose["keypoints"], poseAccuracyThreshold);
      // requestAnimationFrame(() => {
      //   detectPoseThrottle.current(video, model);
      // });
    });
  };

  const detectFrameThrottle = useRef(throttle(detectFrame, 500));
  const detectPoseThrottle = useRef(throttle(detectPose, 1500));

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            facingMode: "user",
          },
        })
        .then((stream) => {
          peer.on("call", (call) => {
            call.answer(stream);
            call.on("stream", () => {});
          });
          // window.stream = stream;
          ws.on("new_student_joined", ({ room }: any) => {
            room
              .filter((user: any) => user.type === "proctor")
              .map((peers: any) => {
                peer.call(peers.peerId, stream);
              });
          });
          if (id !== undefined && peer.id) {
            ws.emit("join_exam_room", {
              roomId: id,
              peerId: peer.id,
              type: "student",
            });
          }

          videoRef.current.srcObject = stream;
          return new Promise((resolve, reject) => {
            videoRef.current.onloadedmetadata = () => {
              resolve(
                videoRef.current.play().then(() => {
                  resolve(videoRef.current);
                })
              );
            };
          });
        });
      const objectModelPromise = cocoSsd.load();
      const poseNetModelPromise = posenet.load();
      
      Promise.all([objectModelPromise, poseNetModelPromise, webCamPromise])
        .then((values) => {
          setInterval(() => {
            detectFrameThrottle.current(videoRef.current, values[0]);
            detectPoseThrottle.current(videoRef.current, values[1]);
          }, 200);
        })
        .catch((error) => {
          //console.error(error);
        });
      return () => {
        ws.off("new_student_joined");
      };
    }
  }, [peer.id, id]);

  const renderPredictions = (predictions: any) => {
    predictions.forEach((prediction: any) => {
      var multiple_face = 0;

      for (let i = 0; i < predictions.length; i++) {
        if (prediction.class == "person") {
          multiple_face = multiple_face + 1;
          if (multiple_face >= 2) {
            handleObjectDetectedEvent("Multiple face detected");
            toast({
              title: "Multiple face detected",
              variant: "destructive",
              duration: 1000,
            });
          }
        }
      }
      if (prediction.score >= accuracyThreshold) {
        if (prediction.class === "cell phone") {
          handleObjectDetectedEvent("Cell Phone Detected");
          toast.success("Cell phone detected");

          count_facedetect = count_facedetect + 1;
        } else if (prediction.class === "book") {
          handleObjectDetectedEvent("Book Detected");
          toast.success("Book Detected");

          count_facedetect = count_facedetect + 1;
        } else if (prediction.class === "laptop") {
          handleObjectDetectedEvent("Laptop Detected");
          toast.success("Cell Phone Detected");
          count_facedetect = count_facedetect + 1;
        } else if (prediction.class !== "person") {
          handleObjectDetectedEvent(`${prediction.class} Detected`);
          // toast({
          //   title: `${prediction.class} Detected`,
          //   description: "Please remove this object",
          //   variant: "destructive",
          //   duration: 1000,
          // });
          toast.success(`${prediction.class} Detected`);

          count_facedetect = count_facedetect + 1;
        }
      }
    });

    sessionStorage.setItem("count_facedetect", count_facedetect as any);
  };

  const handleLookedAwaySocketEvent = () => {
    ws.emit("looked_away", {
      examId: id,
      studentId: 10,
      activity: "User Looked Away",
    });
  };

  const handleObjectDetectedEvent = (activity: string) => {
    ws.emit("object_detected", {
      examId: id,
      studentId: 10,
      activity: activity,
    });
  };

  const EarsDetect = (keypoints: any, minConfidence: any) => {
    const keypointEarR = keypoints[3];
    const keypointEarL = keypoints[4];

    if (keypointEarL.score < minConfidence) {
      handleLookedAwaySocketEvent();
      toast("Please look at the Screen");
    }
    if (keypointEarR.score < minConfidence) {
      handleLookedAwaySocketEvent();
      toast("Please look at the Screen");
    }
  };

  return (
    <div
      className={twMerge([
        "relative aspect-video rounded-lg overflow-hidden ",
        className,
      ])}
    >
      <video
        className={
          "absolute top-0 start-0w-full h-full object-cover -scale-x-100"
        }
        autoPlay
        playsInline
        muted
        ref={videoRef}
      />
    </div>
  );
};

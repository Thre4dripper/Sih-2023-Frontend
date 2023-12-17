import { useEffect, useRef } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import { twMerge } from "tailwind-merge";
import { useToast } from "../ui/use-toast";
import { accuracyThreshold } from "@/constants/utils";
import * as posenet from "@tensorflow-models/posenet";

var count_facedetect = 0;

interface IProps {
  className?: string;
}

export const ObjectDetection = ({ className }: IProps) => {
  const videoRef: any = useRef();
  const { toast } = useToast();
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user",
            width: 500,
            height: 300,
          },
        })
        .then((stream) => {
          // window.stream = stream;
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
          detectFrame(videoRef.current, values[0]);
          detectPose(videoRef.current, values[1]);
        })
        .catch((error) => {
          //console.error(error);
        });
    }
  }, []);

  const detectFrame = (video: any, model: any) => {
    model.detect(video).then((predictions: any) => {
      renderPredictions(predictions);
      requestAnimationFrame(() => {
        detectFrame(video, model);
      });
    });
  };

  const detectPose = (video: any, model: any) => {
    model.estimateSinglePose(video).then((pose: any) => {
      EarsDetect(pose["keypoints"], 0.8);
      requestAnimationFrame(() => {
        detectPose(video, model);
      });
    });
  };

  const renderPredictions = (predictions: any) => {
    predictions.forEach((prediction: any) => {
      console.log(prediction);
      var multiple_face = 0;
      if (prediction.score >= accuracyThreshold) {
        if (prediction.class === "cell phone") {
          console.log("cell phone detected");
          toast({
            key: "cellphone",
            title: "Cell Phone Detected",
            description: "Please remove your cell phone",
            variant: "destructive",
            duration: 1000,
          });

          count_facedetect = count_facedetect + 1;
        } else if (prediction.class === "book") {
          toast({
            key: "book",
            title: "Book Detected",
            description: "Please remove your book",
            variant: "destructive",
            duration: 1000,
          });
          count_facedetect = count_facedetect + 1;
        } else if (prediction.class === "laptop") {
          toast({
            title: "Cell Phone Detected",
            description: "Please remove your laptop",
            variant: "destructive",
            duration: 1000,
          });
          count_facedetect = count_facedetect + 1;
        } else if (prediction.class !== "person") {
          toast({
            title: `${prediction.class} Detected`,
            description: "Please remove this object",
            variant: "destructive",
            duration: 1000,
          });
          count_facedetect = count_facedetect + 1;
        }
      }
    });

    sessionStorage.setItem("count_facedetect", count_facedetect as any);
  };

  const EarsDetect = (keypoints: any, minConfidence: any) => {
    const keypointEarR = keypoints[3];
    const keypointEarL = keypoints[4];

    if (keypointEarL.score < minConfidence) {
      toast({
        title: "You looked away from the Screen (To the Right)",
        variant: "destructive",
        duration: 1000,
      });
    }
    if (keypointEarR.score < minConfidence) {
      toast({
        title: "You looked away from the Screen (To the Left)",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  // runPosenet();

  return (
    <div
      className={twMerge([
        "relative aspect-video rounded-lg overflow-hidden ",
        className,
      ])}
    >
      <video
        className={"absolute top-0 start-0w-full h-full object-cover"}
        autoPlay
        playsInline
        muted
        ref={videoRef}
      />
    </div>
  );
};

import { useEffect, useRef } from "react";
// import swal from "sweetalert";
//import count from './Login';
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import { twMerge } from "tailwind-merge";
// import "./Detections.css";
var count_facedetect = 0;

interface IProps {
  className?: string;
}

export const ObjectDetection = ({ className }: IProps) => {
  const videoRef: any = useRef();
  const canvasRef: any = useRef();

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
      const modelPromise = cocoSsd.load();
      Promise.all([modelPromise, webCamPromise])
        .then((values) => {
          detectFrame(videoRef.current, values[0]);
        })
        .catch((error) => {
          //console.error(error);
        });
    }
  }, []);

  const detectFrame = (video: any, model: any) => {
    model.detect(video).then((predictions: any) => {
      if (canvasRef.current) {
        renderPredictions(predictions);
        requestAnimationFrame(() => {
          detectFrame(video, model);
        });
      } else {
        return false;
      }
    });
  };

  const renderPredictions = (predictions: any) => {
    //var count=100;
    const ctx = canvasRef?.current?.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    predictions.forEach((prediction: any) => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Draw the bounding box.
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 8, textHeight + 8);

      var multiple_face = 0;
      for (let i = 0; i < predictions.length; i++) {
        //Face,object detection
        if (predictions[i].class === "cell phone") {
          // window.alert("Cell Phone Detected");
          // swal("Cell Phone Detected", "Action has been Recorded", "error");
          count_facedetect = count_facedetect + 1;
        } else if (predictions[i].class === "book") {
          // window.alert("Book Detected");
          // swal("Object Detected", "Action has been Recorded", "error");
          count_facedetect = count_facedetect + 1;
        } else if (predictions[i].class === "laptop") {
          // window.alert("Laptop Detected");
          // swal("Object Detected", "Action has been Recorded", "error");
          count_facedetect = count_facedetect + 1;
        } else if (predictions[i].class !== "person") {
          // window.alert("Object Detected");
          // swal("Face Not Visible", "Action has been Recorded", "error");
          count_facedetect = count_facedetect + 1;
        }
      }
    });

    predictions.forEach((prediction: any) => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      //console.log(predictions)
      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      //console.log(prediction.class);

      if (
        prediction.class === "person" ||
        prediction.class === "cell phone" ||
        prediction.class === "book" ||
        prediction.class === "laptop"
      ) {
        ctx.fillText(prediction.class, x, y);
      }
    });
    //console.log("final")
    //console.log(count_facedetect)
    sessionStorage.setItem("count_facedetect", count_facedetect as any);
  };

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
      <canvas
        className="absolute top-0 object-cover w-full h-full start-0"
        ref={canvasRef}
      />
    </div>
  );
};

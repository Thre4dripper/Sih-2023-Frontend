import Mcq from "@/components/student-exam.tsx/mcq";
import QuestionVideoContainer from "@/components/student-exam.tsx/question-video-container";
import Timer from "@/components/student-exam.tsx/timer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";

const StudentExam = () => {
  // Wiered behaviour on full screen
  // useStudentExamMonitor();
  // useDisableRightClick();
  // useDetectTabChange();
  // useKeyboardDisable();

  return (
    <div
      className="p-4"
      style={{
        background:
          "linear-gradient(to bottom,rgba(255,255,255,0.0),rgb(137, 77, 238,0.06))",
      }}
    >
      <Timer />
      <QuestionVideoContainer />
      <Mcq />
      <Dialog open={false}>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle>Fullscreen</DialogTitle>
            <DialogDescription>
              Enter fullscreen mode to start the exam
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => {
              document.documentElement.requestFullscreen();
            }}
          >
            Fullscreen
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentExam;

const useStudentExamMonitor = () => {
  useEffect(() => {
    console.log("useStudentExamMonitor");

    const handleFullscreenChange = () => {
      console.log(document.fullscreenElement);

      if (document.fullscreenElement) {
        console.log("enter");
      } else {
        console.log("exit");
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    // document.addEventListener("fullscreenerror",handleFullscreenError);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);
};

const useDisableRightClick = () => {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // window.alert("Hehe Boi Right Click is disabled");
      e.preventDefault();
      console.log(window.screen.height, window.screen.width);
      console.log(window.innerHeight, window.innerWidth);
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
};

const useDetectTabChange = () => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("hidden");
      } else {
        console.log("visible");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
};

const useKeyboardDisable = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      window.alert("Hehe Boi Keyboard is disabled");
      e.preventDefault();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};

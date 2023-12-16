import Mcq from "@/components/student-exam.tsx/mcq";
import QuestionVideoContainer from "@/components/student-exam.tsx/question-video-container";
import Timer from "@/components/student-exam.tsx/timer";
import { useEffect } from "react";

const StudentExam = () => {
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
    </div>
  );
};

export default StudentExam;
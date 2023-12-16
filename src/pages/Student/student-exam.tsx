import Mcq from "@/components/student-exam.tsx/mcq";
import QuestionVideoContainer from "@/components/student-exam.tsx/question-video-container";
import Timer from "@/components/student-exam.tsx/timer";
import { useState } from "react";

const StudentExam = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  return (
    <div
      className="p-4"
      style={{
        background:
          "linear-gradient(to bottom,rgba(255,255,255,0.0),rgb(137, 77, 238,0.06))",
      }}
    >
      <Timer />
      <QuestionVideoContainer
        DATA={DATA}
        setCurrentQuestion={setCurrentQuestion}
        currentQuestion={currentQuestion}
      />
      <Mcq
        DATA={DATA}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
      />
    </div>
  );
};

export default StudentExam;

const DATA = [
  {
    id: 1,
    question: "1What is the output of the following code?",
    questonType: "single_select",
    description: "```python\nprint(2 + 3)\n```",
    marks: 5,
    negatveMarks: 0,
    options: [
      {
        option: "Wow what a question",
        isCorrect: false,
      },
      {
        option: "Amazing question what a question",
        isCorrect: false,
      },
      {
        option: "What an amazing question no one has ever asked this question",
        isCorrect: true,
      },
      {
        option: "Wow what a question",
        isCorrect: false,
      },
    ],
  },
  {
    id: 2,
    question: "2What is the output of the following code?",
    questonType: "single_select",
    description: "```python\nprint(2 + 3)\n```",
    marks: 5,
    negatveMarks: 0,
    options: [
      {
        option: "Wow what a question",
        isCorrect: false,
      },
      {
        option: "Amazing question what a question",
        isCorrect: false,
      },
      {
        option: "What an amazing question no one has ever asked this question",
        isCorrect: true,
      },
      {
        option: "Wow what a question",
        isCorrect: false,
      },
    ],
  },
  {
    id: 3,
    question: "3What is the output of the following code?",
    questonType: "single_select",
    description: "```python\nprint(2 + 3)\n```",
    marks: 5,
    negatveMarks: 0,
    options: [
      {
        option: "Wow what a question",
        isCorrect: false,
      },
      {
        option: "Amazing question what a question",
        isCorrect: false,
      },
      {
        option: "What an amazing question no one has ever asked this question",
        isCorrect: true,
      },
      {
        option: "Wow what a question",
        isCorrect: false,
      },
    ],
  },
  {
    id: 4,
    question: "4What is the output of the following code?",
    questonType: "single_select",
    description: "```python\nprint(2 + 3)\n```",
    marks: 5,
    negatveMarks: 0,
    options: [
      {
        option: "Wow what a question",
        isCorrect: false,
      },
      {
        option: "Amazing question what a question",
        isCorrect: false,
      },
      {
        option: "What an amazing question no one has ever asked this question",
        isCorrect: true,
      },
      {
        option: "Wow what a question",
        isCorrect: false,
      },
    ],
  },
  {
    id: 5,
    question: "5What is the output of the following code?",
    questonType: "single_select",
    description: "```python\nprint(2 + 3)\n```",
    marks: 5,
    negatveMarks: 0,
    options: [
      {
        option: "Wow what a question",
        isCorrect: false,
      },
      {
        option: "Amazing question what a question",
        isCorrect: false,
      },
      {
        option: "What an amazing question no one has ever asked this question",
        isCorrect: true,
      },
      {
        option: "Wow what a question",
        isCorrect: false,
      },
    ],
  },
  {
    id: 6,
    question: "6What is the output of the following code?",
    questonType: "single_select",
    description: "```python\nprint(2 + 3)\n```",
    marks: 5,
    negatveMarks: 0,
    options: [
      {
        option: "Wow what a question",
        isCorrect: false,
      },
      {
        option: "Amazing question what a question",
        isCorrect: false,
      },
      {
        option: "What an amazing question no one has ever asked this question",
        isCorrect: true,
      },
      {
        option: "Wow what a question",
        isCorrect: false,
      },
    ],
  },
  {
    id: 7,
    question: "7What is the output of the following code?",
    questonType: "single_select",
    description: "```python\nprint(2 + 3)\n```",
    marks: 5,
    negatveMarks: 0,
    options: [
      {
        option: "Wow what a question",
        isCorrect: false,
      },
      {
        option: "Amazing question what a question",
        isCorrect: false,
      },
      {
        option: "What an amazing question no one has ever asked this question",
        isCorrect: true,
      },
      {
        option: "Wow what a question",
        isCorrect: false,
      },
    ],
  },
  {
    id: 8,
    question: "8What is the output of the following code?",
    questonType: "single_select",
    description: "```python\nprint(2 + 3)\n```",
    marks: 5,
    negatveMarks: 0,
    options: [
      {
        option: "Wow what a question",
        isCorrect: false,
      },
      {
        option: "Amazing question what a question",
        isCorrect: false,
      },
      {
        option: "What an amazing question no one has ever asked this question",
        isCorrect: true,
      },
      {
        option: "Wow what a question",
        isCorrect: false,
      },
    ],
  },
];

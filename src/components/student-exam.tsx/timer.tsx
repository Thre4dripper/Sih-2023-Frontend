import { studentExamState } from "@/atoms/student-exam-state";
import { Pause, TimerIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { Button } from "../ui/button";

const findTimeString = (timer: number) => {
  const seconds = timer % 60 < 10 ? `0${timer % 60}` : `${timer % 60}`;
  const minutes =
    Math.floor(timer / 60) % 60 < 10
      ? `0${Math.floor(timer / 60) % 60}`
      : `${Math.floor(timer / 60) % 60}`;

  const hours =
    Math.floor(timer / 3600) < 10
      ? `0${Math.floor(timer / 3600)}`
      : `${Math.floor(timer / 3600)}`;

  return `${hours}:${minutes}:${seconds}`;
};

const Timer = ({}) => {
  const [timer, setTimer] = useState<number>(0);
  const timerRef = useRef<{ id: NodeJS.Timeout | null }>({ id: null });
  const examState = useRecoilValue(studentExamState);
  const endExamAttempt = () => {};

  useEffect(() => {
    const end_date = Date.now() + 1000 * 30 * 60;
    // new Date(DATA.startTime).getTime() + DATA.duration * 60 * 1000;
    if (end_date <= Date.now()) {
      //   endExamAttempt();
      return;
    }
    setTimer(Math.floor((end_date - Date.now()) / 1000));
    timerRef.current.id = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => {
      if (timerRef.current.id) clearInterval(timerRef.current.id);
    };
  }, []);

  useEffect(() => {
    if (timer == 0) {
      endExamAttempt();
    }
  }, [timer]);

  // Event Handlers

  return (
    <>
      <div className="flex items-center gap-4 p-4 bg-white border rounded-lg shadow-md border-1 border-primary">
        <div className="flex items-center gap-1">
          <h4 className="text-lg">{examState.examInfo?.name}</h4>
          <span className="">•</span>
          <TimerIcon className="" />
          <p className="w-[8rem]">
            Ends in <span>{findTimeString(timer)}</span>
          </p>
        </div>
        <div className="items-center flex-1 h-2 bg-gray-200 rounded-full ">
          <div
            className="h-2 rounded-md bg-primary"
            style={{
              width: `${
                100 - (timer / (60 * examState.examInfo?.duration!)) * 100
              }%`,
            }}
          ></div>
        </div>
        <Button className={`ms-3`}>
          <Pause className="" />
          End Test
        </Button>
      </div>
    </>
  );
};

export default Timer;

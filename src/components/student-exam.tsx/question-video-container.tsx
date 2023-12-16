import AllQuestion, { IQuestion } from "./all-question";
import VideoMonitor from "./video-monitor";
interface IProps {
  DATA: IQuestion[];
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  currentQuestion: number;
}
const QuestionVideoContainer = ({
  DATA,
  setCurrentQuestion,
  currentQuestion,
}: IProps) => {
  return (
    <div className="flex items-start justify-between gap-8 p-4 mt-4 border rounded-lg border-1 border-primary">
      <AllQuestion
        DATA={DATA}
        setCurrentQuestion={setCurrentQuestion}
        currentQuestion={currentQuestion}
      />
      <VideoMonitor />
    </div>
  );
};

export default QuestionVideoContainer;

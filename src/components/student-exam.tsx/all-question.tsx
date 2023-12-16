import { twMerge } from "tailwind-merge";

export interface IQuestion {
  id: number;
  question: string;
  questonType: string;
  description: string;
  marks: number;
  negatveMarks: number;
  options: { option: string; isCorrect: boolean }[];
}

interface IProps {
  DATA: IQuestion[];
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  currentQuestion: number;
}

const AllQuestion = ({ DATA, setCurrentQuestion, currentQuestion }: IProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      {DATA.map((question, index) => (
        <div
          key={question.id}
          className={twMerge([
            "p-3 px-5 rounded-lg cursor-pointer",
            currentQuestion === index + 1
              ? "bg-primary text-white"
              : "bg-white border border-primary",
          ])}
          onClick={() => setCurrentQuestion(index + 1)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default AllQuestion;

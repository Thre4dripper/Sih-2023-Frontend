import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IQuestion } from "./all-question";

function indexToLetter(index: number) {
  // Assuming index starts from 1
  var charCode = 96 + index;
  return String.fromCharCode(charCode);
}

interface IProps {
  DATA: IQuestion[];
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  currentQuestion: number;
}

const Mcq = ({ DATA, currentQuestion, setCurrentQuestion }: IProps) => {
  // Other Functions
  const [selectedOption, setSelectedOption] = useState<number[]>([]);

  const handleOptionSelect = (optionIndex: number) => {
    if (DATA[currentQuestion - 1].questonType === "single_select") {
      setSelectedOption([optionIndex]);
    } else {
      if (!selectedOption.includes(optionIndex)) {
        setSelectedOption((prev) => [...prev, optionIndex]);
      } else {
        setSelectedOption((prev) =>
          prev.filter((option) => option != optionIndex)
        );
      }
    }
  };

  const resetHandler = () => {
    setSelectedOption([]);
  };

  useEffect(() => {
    setSelectedOption([]);
  }, [currentQuestion]);

  return (
    <div className="p-4 mt-4 bg-white border rounded-lg border-1 border-primary">
      <div className={`d-flex flex-column justify-content-center p-4 m-sm-2`}>
        <h4 className="text-xl">{DATA[currentQuestion - 1].question}</h4>
        <div className="flex items-center justify-between my-3">
          <h2 className={``}>{DATA[currentQuestion - 1].description}</h2>
          <div className={` p-2 bg-muted rounded-md `}>
            {DATA[currentQuestion - 1].marks} Points
          </div>
        </div>
        <ul className="flex flex-col gap-6 my-8">
          {DATA[currentQuestion - 1].options?.map((option, index) => (
            <li
              key={index}
              className={`${
                selectedOption.includes(index) ? "border-primary border-2" : ""
              }border-gray-300 border border-1 px-4 py-4 rounded-md `}
            >
              <label className={` flex  gap-2`} style={{ cursor: "pointer" }}>
                <Input
                  type="radio"
                  className="h-4 mt-1 min-w-[16px] max-w-[16px] text-primary"
                  //   name={`${index}`}
                  checked={selectedOption.includes(index)}
                  onClick={() => handleOptionSelect(index)}
                />
                {indexToLetter(index + 1) + ". " + option?.option}
              </label>
            </li>
          ))}
        </ul>

        <div className={` flex gap-6 justify-end align-items-center mt-8 `}>
          <Button className={``} onClick={resetHandler}>
            Clear Selection
          </Button>
          {DATA.length === currentQuestion ? (
            <Button>Submit</Button>
          ) : (
            <Button
              onClick={() => {
                setCurrentQuestion((prev) => prev + 1);
              }}
              className={""}
            >
              Save & Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mcq;

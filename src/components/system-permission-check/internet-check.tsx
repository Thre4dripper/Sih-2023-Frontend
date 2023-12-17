import { CheckCircle2, Gauge } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

const InternetCheck: React.FC = () => {
  const [speedCheck, setSpeedCheck] = useState<boolean | null>(null);
  const [speed, setSpeed] = useState<number | null>(null);

  const checkInternetSpeed = async () => {
    const fileSizeInBytes = 7000000; // Size of file in bytes (7MB)
    const url =
      "https://api41.ilovepdf.com/v1/download/71b19ykcdkzbcp1pyx7t0dlxq7wpq9tdpz8lqpdh6A44xv0f20g6r8tyxz29bxd8nhb9jz986ky7ty604pd8kfmcxys371r6jm31lgztdc3fh40x1jhqp3434nldzr4qcxj7x0p895rtkrAwnbmqrx90nby3bvm9tmyxdtyprj8f1rb0v101"; // URL of a test file of known size

    const startTime = Date.now();
    await fetch(url);
    const endTime = Date.now();

    const durationInSeconds = (endTime - startTime) / 1000;
    const bitsLoaded = fileSizeInBytes * 8;
    const speedMbps = Number(
      (bitsLoaded / durationInSeconds / (1024 * 1024)).toFixed(2)
    );

    if (speedMbps < 8) {
      setSpeedCheck(false);
    } else {
      setSpeedCheck(true);
    }
    setSpeed(Number(speedMbps));
  };
  //   useEffect(() => {
  //     checkInternetSpeed();
  //   }, []);

  return (
    <div className="flex items-center justify-between gap-8 p-4 border rounded-lg border-primary">
      <div className="flex items-center gap-2">
        <Gauge className="text-primary" />
        <h3 className="text-lg">Internet Speed Check</h3>
      </div>
      {speedCheck === true ? (
        <div className="px-6 py-2 border rounded-lg border-primary">
          <CheckCircle2 className="text-primary" />
        </div>
      ) : (
        <Button className="ml-2" onClick={checkInternetSpeed}>
          Allow
        </Button>
      )}
    </div>
  );
};

export default InternetCheck;

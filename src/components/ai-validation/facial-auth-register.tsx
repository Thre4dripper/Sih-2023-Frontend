import {  useEffect } from "react";
import faceIO from "@faceio/fiojs";
import { Button } from "../ui/button";
export const FacialAuthRegister = () => {
  let faceio: any;
  useEffect(() => {
    faceio = new faceIO(import.meta.env.VITE_APP_FIO_PUBLIC_ID);
  }, []);

  const handleSignIn = async () => {
    try {
      let response = await faceio.enroll({
        locale: "auto",
        payload: {
          email: "example@gmail.com",
          whoami: "12345",
        },
      });

      console.log(` Unique Facial ID: ${response.facialId}
      Enrollment Date: ${response.timestamp}
      Gender: ${response.details.gender}
      Age Approximation: ${response.details.age}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogIn = async () => {
    try {
      let response = await faceio.authenticate({
        locale: "auto",
      });

      console.log(
        ` Unique Facial ID: ${response.facialId}
          PayLoad: ${response.payload}
          `,
        response.payload
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={handleSignIn}>Register</Button>
      <Button onClick={handleLogIn}>Authenticate</Button>
    </div>
  );
};

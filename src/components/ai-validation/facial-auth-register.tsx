import { useContext, useEffect, useRef, useState } from "react";
import faceIO from "@faceio/fiojs";
import { Button } from "../ui/button";
import { SocketContext } from "@/lib/providers/socket-provider/socket-context";
import { VideoPlayer } from "../video/video-player";
export const FacialAuthRegister = () => {
  let faceio: any;
  useEffect(() => {
    faceio = new faceIO(import.meta.env.VITE_APP_FIO_PUBLIC_ID);
  }, []);
  const { ws, me } = useContext(SocketContext);

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

  const joinRoom = () => {
    ws.emit("join-exam-room", {
      examId: "12345",
      userId: "12345",
      userName: "test",
      userEmail: "",
      userRole: "hat bsdk",
    });
  };

  useEffect(() => {
    if (me) {
      console.log(me._id);
      ws.emit("join-exam-room", {
        peerId: me._id,
      });
    }
  }, [me, ws]);

  return (
    <div>
      <Button onClick={handleSignIn}>Register</Button>
      <Button onClick={handleLogIn}>Authenticate</Button>
      <Button onClick={joinRoom}>joinRoom</Button>
      {/* <VideoPlayer classNames="w-1/2 h-1/2" stream={stream} /> */}
    </div>
  );
};

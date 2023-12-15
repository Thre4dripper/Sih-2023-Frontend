import { createContext, useEffect, useState } from "react";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";
import { ws } from "./ws";

// interface ISocketContext {
//   stream?: MediaStream;
//   screenStream?: MediaStream;
//   peers: PeerState;
//   shareScreen: () => void;
//   roomId: string;
//   setRoomId: (id: string) => void;
//   screenSharingId: string;
// }
export const SocketContext = createContext<null | any>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [me, setMe] = useState<Peer>();

  const getUsers = ({ users }: any) => {
    console.log(users);
  };
  useEffect(() => {
    const meId = uuidV4();
    const peer = new Peer(meId);
    setMe(peer);
    ws.on("users", getUsers);
  }, []);
  return (
    <SocketContext.Provider value={{ ws, me }}>
      {children}
    </SocketContext.Provider>
  );
};

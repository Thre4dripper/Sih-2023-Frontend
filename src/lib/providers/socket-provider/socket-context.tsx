import { createContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
const WS = import.meta.env.VITE_APP_API_HOST;
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";
export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [me, setMe] = useState<Peer>();
  useEffect(() => {
    const meId = uuidV4();
    const peer = new Peer(meId);
    setMe(peer);
  }, []);
  return (
    <RoomContext.Provider value={{ ws, me }}>{children}</RoomContext.Provider>
  );
};

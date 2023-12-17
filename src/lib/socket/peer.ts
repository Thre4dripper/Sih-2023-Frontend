import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";
const peer = new Peer("", {
  host: "/",
  port: 3001,
});

export { peer };

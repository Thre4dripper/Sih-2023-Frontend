import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export const Join = () => {
  const navigate = useNavigate();
  const createRoom = () => {
    navigate(`/room/abcd`);
  };
 

  return (
    <div>
      <Button onClick={createRoom}>Create</Button>
      {/* <Button onClick={handleJoin}>Join</Button> */}
    </div>
  );
};

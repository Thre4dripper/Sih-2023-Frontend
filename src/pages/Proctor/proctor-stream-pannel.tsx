import { Input } from "@/components/ui/input";
import { VideoPlayer } from "@/components/video/video-player";
import { peer } from "@/lib/socket/peer";
import { ws } from "@/lib/socket/ws";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const ProctorStreamPanel = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [currentSelectedStream, setCurrentSelectedStream] = useState<
    number | null
  >(null);
  //   Priority based search
  const { id } = useParams();
  const [streams, setStreams] = useState<any>([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user",
          },
        })
        .then((stream) => {
          peer.on("call", (call) => {
            call.answer(stream);
            call.on("stream", (remoteStream) => {
              // console.log("remoteStream", remoteStream);
              setStreams((prevState: any) => [
                ...prevState,
                {
                  stream: remoteStream,
                  id: stream.id,
                  name: "a new student",
                },
              ]);
            });
          });

          if (id !== undefined && peer.id) {
            ws.emit("join_exam_room", {
              roomId: id,
              peerId: peer.id,
              type: "proctor",
            });
          }

          ws.on("new_student_joined", ({ room }: any) => {
            setStreams({});
            room
              .filter((user: any) => user.type === "proctor")
              .map((user: any) => {
                const call = peer.call(user.peerId, stream);
                call.on("stream", (remoteStream) => {
                  setStreams((prevState: any) => [
                    ...prevState,
                    {
                      stream: remoteStream,
                      name: "a new student",
                      id: stream.id,
                    },
                  ]);
                });
              });
          });
          ws.on("new_proctor_joined", ({ room }: any) => {
            room
              .filter((user: any) => user.type === "student")
              .map((user: any) => {
                const call = peer.call(user.peerId, stream);
                call.on("stream", (remoteStream) => {
                  setStreams((prevState: any) => [
                    ...prevState,
                    {
                      stream: remoteStream,
                      name: "a new student",
                      id: stream.id,
                    },
                  ]);
                });
              });
          });
        });

      webCamPromise.then(() => {});

      return () => {
        ws.off("new_proctor_joined");
        ws.off("new_student_joined");
      };
    }
  }, [id, peer.id]);

  const filteredData = DATA.filter((stream) =>
    stream.name.toLowerCase().includes(searchInput.toLowerCase())
  )
    .map((stream) => ({
      ...stream,
      priority: stream.name.toLowerCase().indexOf(searchInput),
    }))
    .sort((a, b) => a.priority - b.priority);

  const filterUniqueStreamsById = (arr: any) => {
    const map = new Map();
    for (const item of arr) {
      if (!map.has(item.id)) {
        map.set(item.id, true); // set any value to Map
      }
    }
    return arr.filter((item: any) => map.delete(item.id));
  };

  console.log(
    "peerids",
    // show all unique ids
    filterUniqueStreamsById(streams),
    currentSelectedStream
  );
  return (
    <div className="flex flex-col p-4">
      <h1 className="text-2xl text-center ">Proctor Stream Pannel</h1>
      {currentSelectedStream !== null ? (
        <VideoPlayer
          key={streams[currentSelectedStream! - 1].id}
          stream={streams[currentSelectedStream! - 1].stream}
          className="rounded-lg h-[32rem] object-contain aspect-[16/9]"
        />
      ) : null}
      <div></div>
      <div className="flex items-center gap-4 mx-5">
        <Search className="w-6 h-6 mt-8 text-primary" />
        <Input
          type="text"
          placeholder="Search"
          className="w-full mt-8 bg-secondary"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 mx-5 mt-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {streams?.map((stream: any, index: number) => {
          return (
            <div
              className={twMerge([
                " flex transition-all duration-300 ease-in-out cursor-pointer hover:shadow-md rounded-lg ",
                currentSelectedStream === index + 1
                  ? "border p-1.5 border-primary"
                  : null,
              ])}
              onClick={() => setCurrentSelectedStream(index + 1)}
            >
              <VideoPlayer
                key={stream.id}
                stream={stream.stream}
                className="rounded-lg"
              />
            </div>
            // <VideoStream
            //   index={index}
            //   key={stream.stream.id}
            //   name={stream.name}
            //   iconUrl={"/medusalogo.png"}
            //   currentSelectedStream={stream}
            //   setCurrentSelectedStream={setCurrentSelectedStream}
            // />
          );
        })}
      </div>
    </div>
  );
};

export default ProctorStreamPanel;

const DATA = [
  {
    id: 1,
    name: "jane doe",
    iconUrl: "https://github.com/shadcn.png",
  },
  {
    id: 2,
    name: "shad cn",
    iconUrl: "https://github.com/shadcn.png",
  },
  {
    id: 3,
    name: "amaze doe",
    iconUrl: "https://github.com/shadcn.png",
  },
  {
    id: 4,
    name: "catch me doe",
    iconUrl: "https://github.com/shadcn.png",
  },
  {
    id: 5,
    name: "out of the box doe",
    iconUrl: "https://github.com/shadcn.png",
  },
  {
    id: 6,
    name: "in the box doe",
    iconUrl: "https://github.com/shadcn.png",
  },
  {
    id: 7,
    name: "not in the box doe",
    iconUrl: "https://github.com/shadcn.png",
  },
  {
    id: 8,
    name: "all in the box doe",
    iconUrl: "https://github.com/shadcn.png",
  },
  {
    id: 9,
    name: "hehe boi doe",
    iconUrl: "https://github.com/shadcn.png",
  },
  {
    id: 10,
    name: "doe",
    iconUrl: "https://github.com/shadcn.png",
  },
];

import { Input } from "@/components/ui/input";
import MainVideoStream from "@/components/video-stream/main-video-stream";
import VideoStream from "@/components/video-stream/video-stream";
import { Search } from "lucide-react";
import { useState } from "react";

const ProctorStreamPannel = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [currentSelectedStream, setCurrentSelectedStream] = useState<number>(1);
  //   Priority based search
  const filteredData = DATA.filter((stream) =>
    stream.name.toLowerCase().includes(searchInput.toLowerCase())
  )
    .map((stream) => ({
      ...stream,
      priority: stream.name.toLowerCase().indexOf(searchInput),
    }))
    .sort((a, b) => a.priority - b.priority);

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-2xl text-center ">Proctor Stream Pannel</h1>
      <div>
        <MainVideoStream {...DATA[currentSelectedStream - 1]} />
      </div>
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
        {filteredData.map((item, index) => {
          return (
            <VideoStream
              index={index}
              key={item.id}
              name={item.name}
              iconUrl={item.iconUrl}
              currentSelectedStream={currentSelectedStream}
              setCurrentSelectedStream={setCurrentSelectedStream}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProctorStreamPannel;

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

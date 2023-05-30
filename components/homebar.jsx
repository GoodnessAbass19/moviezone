"use client";
import { TvIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
// import { BsFillPlayCircleFill} from 'react-icon/lib'
const HomeBar = () => {
  const [click, setClick] = useState(false);
  return (
    <nav className="flex gap-5 items-center">
      <div>
        <h2 className="text-3xl font-semibold md:block hidden">Trending</h2>
      </div>
      <div className="flex justify-start gap-5">
        <button>
          <Link
            onClick={() => setClick(!click)}
            href={`home`}
            className={`bg-blue-500 text-white flex text-lg font-semibold items-center p-2 rounded-md ${
              click ? "bg-inherit" : "bg-blue-500"
            }`}
          >
            <div className="hidden md:block">
              <VideoCameraIcon className="w-5 h-5 inline-block" />{" "}
            </div>{" "}
            Movies
          </Link>
        </button>
        <button>
          <Link
            onClick={() => setClick(!click)}
            href={`home/trending-tv`}
            className={` text-white text-lg flex font-semibold items-center p-2 rounded-md ${
              click ? "bg-blue-500" : "bg-inherit"
            }`}
          >
            <div className="hidden md:block">
              <TvIcon className="w-5 h-5 inline-block" />
            </div>
            Tv Shows
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default HomeBar;

"use client";

import { useEffect, useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import DisplayVideo from "./DisplayVideo";

const Video = ({ movies }) => {
  const [trailer, setTrailer] = useState(false);

  return (
    <div>
      <button
        onClick={() => setTrailer(!trailer)}
        className="xl:bg-black bg-white xl:text-white text-black md:p-2 p-1.5 text-lg font-semibold rounded-md flex justify-center items-center"
      >
        <PlayIcon className="xl:text-white text-black w-5 h-5 inline-block" />
        Trailer
      </button>
      {trailer && <DisplayVideo movies={movies} Close={setTrailer} />}
    </div>
  );
};

export default Video;

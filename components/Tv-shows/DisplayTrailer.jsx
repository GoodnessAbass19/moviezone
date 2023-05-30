"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";

const DisplayTrailer = ({ film, Close }) => {
  return (
    <div className="fixed bg-black/80 w-full h-screen top-0 left-0 z-[999]">
      <div className="relative justify-center items-center rounded-md p-5  border-md md:max-w-screen-lg max-w-xs mx-auto xl:right-10 w-full h-full inset-y-0 xl:top-20 lg:top-20 top-1/4">
        <div className="flex justify-end items-end">
          <button onClick={() => Close(false)} className="text-white">
            {" "}
            <XMarkIcon className="text-2xl md:w-10 md:h-10 h-6 w-6" />{" "}
          </button>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-10">
          {film.results
            .filter((red) => red.type.includes("Trailer"))
            .slice(0, 1)
            .map((item) => (
              <div key={item.id}>
                <iframe
                  src={`https://www.youtube.com/embed/${item.key}`}
                  allowFullScreen
                  frameborder="0"
                  className="rounded-md xl:max-w-screen-xl xl:h-[600px] lg:max-w-screen-md lg:h-[400px] md:max-w-screen-sm md:h-[400px] max-w-[320px] h-[300px] object-contain aspect-video mx-auto border-2 border-black shadow-lg shadow-black"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayTrailer;

"use client";

import Movie from "../Movies/Movie";
import Tv from "../Tv-shows/tv";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const LatestShow = () => {
  const { data, isLoading } = useSWR(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher
  );
  if (isLoading)
    return (
      <div className="grid lg:grid-cols-12 md:grid-cols-4 grid-cols-2 py-10 md:gap-10 gap-5 mx-auto">
        {Array(20)
          .fill(1)
          .map((item, idx) => (
            <div
              key={idx}
              className="animate-pulse lg:h-[300px] h-[400px] col-span-2 sm:col-span-1 lg:col-span-2 bg-[#312e81]"
            />
          ))}
      </div>
    );

  return (
    data && (
      <div className="w-full md:mt-20 mt-10">
        <div>
          <h2 className="font-semibold md:text-4xl text-2xl capitalize">
            Latest Tv shows
          </h2>
        </div>
        <div className="grid lg:grid-cols-fluid md:grid-cols-4 grid-cols-2 py-10 md:gap-10 gap-5 mx-auto">
          {data.results.map((item) => (
            <Tv
              key={item.id}
              id={item.id}
              title={item.name}
              release_date={item.release_date}
              poster_path={item.poster_path}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default LatestShow;

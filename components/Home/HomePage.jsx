"use client";
import Movie from "../Movies/Movie";

import LatestMovies from "./latestMovie";
import LatestShow from "./latestShow";

import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const HomePage = () => {
  const { data, isLoading } = useSWR(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
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
      <div className="max-w-full">
        <div className="grid lg:grid-cols-fluid md:grid-cols-4 grid-cols-2 py-10 md:gap-10 gap-5 mx-auto">
          {data.results.map((item) => (
            <Movie
              key={item.id}
              id={item.id}
              title={item.title}
              release_date={item.release_date}
              poster_path={item.poster_path}
              vote={item.vote_average}
            />
          ))}
        </div>

        <LatestMovies />
        <LatestShow />
      </div>
    )
  );
};

export default HomePage;

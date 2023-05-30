"use client";

import useSWR from "swr";
import Movie from "./Movie";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Similar = ({ movies }) => {
  const { data, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${movies}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
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
      <div className="pt-20 lg:m-20 md:m-15 m-10">
        <h2 className="capitalize text-3xl font-semibold">you may also like</h2>
        <div className="grid lg:grid-cols-fluid md:grid-cols-4 grid-cols-2 py-10 md:gap-10 gap-5 mx-auto">
          {data.results.map((item) => (
            <Movie
              poster_path={item.poster_path}
              key={item.id}
              id={item.id}
              title={item.original_title}
              release_date={item.release_date}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default Similar;

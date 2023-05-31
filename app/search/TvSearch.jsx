"use client";

import Tv from "@/components/Tv-shows/tv";
import { useState } from "react";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const TvSearch = ({ id, page }) => {
  const { data, isLoading } = useSWR(
    `https://api.themoviedb.org/3/search/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${id}&page=${page}`,
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
      <div className="max-w-full lg:m-20 md:m-15 m-5">
        <h2 className="text-xl md:text-2xl font-semibold pt-10">
          Tv-Shows results
        </h2>
        <div className="grid lg:grid-cols-fluid md:grid-cols-4 grid-cols-2 py-10 md:gap-10 gap-5 mx-auto">
          {data.results.map((item) => (
            <Tv
              key={item.id}
              id={item.id}
              title={item.original_name}
              release_date={item.release_date}
              poster_path={item.poster_path}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default TvSearch;

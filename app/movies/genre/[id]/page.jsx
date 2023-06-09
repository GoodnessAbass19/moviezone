"use client";

import Genre from "@/components/Movies/Genre";
import Movie from "@/components/Movies/Movie";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Genres = ({ params }) => {
  const { id } = params;
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSWR(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=${id}&page=${page}`,
    fetcher
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const renderPaginationButtons = () => {
    const totalPages = data.total_pages;
    const currentPage = page;
    const visiblePages = 5; // Number of visible page buttons excluding the first and last page buttons
    const delta = Math.floor((visiblePages - 1) / 2);
    let start = currentPage - delta;
    let end = currentPage + delta;

    if (totalPages <= visiblePages) {
      start = 1;
      end = totalPages;
    } else {
      if (currentPage <= delta) {
        start = 1;
        end = visiblePages;
      } else if (currentPage >= totalPages - delta) {
        start = totalPages - visiblePages + 1;
        end = totalPages;
      }
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          className={`${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          } hover:bg-blue-500 hover:text-white font-semibold py-2 px-2.5 md:px-4 mx-1 rounded`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    const paginationButtons = [
      <button
        key="prev"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 md:px-4 rounded"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>,
      pages,
      <button
        key="next"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 md:px-4 rounded"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>,
    ];

    // if (start > 1) {
    //   paginationButtons.splice(
    //     1,
    //     0,
    //     <span key="dots-start" className="text-gray-800 mx-1">
    //       ...
    //     </span>
    //   );
    // }
    if (end < totalPages) {
      paginationButtons.splice(
        paginationButtons.length - 1,
        0,
        <span key="dots-end" className="text-white mx-1">
          ...
        </span>
      );
    }

    return paginationButtons;
  };

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
        {/* <Genre /> */}
        <div className="grid lg:grid-cols-fluid md:grid-cols-4 grid-cols-2 py-10 md:gap-10 gap-5 mx-auto">
          {data.results.map((item) => (
            <Movie
              key={item.id}
              id={item.id}
              title={item.title}
              release_date={item.release_date}
              poster_path={item.poster_path}
            />
          ))}
        </div>
        <div className="flex justify-center mt-5">
          {renderPaginationButtons()}
        </div>
      </div>
    )
  );
};

export default Genres;

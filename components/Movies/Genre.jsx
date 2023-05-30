"use client";
import Link from "next/link";
import useSWR from "swr";
import TvGenre from "../Tv-shows/TvGenre";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Genre = ({ close }) => {
  const { data, isLoading } = useSWR(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher
  );

  return (
    data && (
      <div className="flex justify-center gap-5">
        <ul className="grid justify-center items-center gap-x-5 md:grid-cols-2">
          {data.genres.map((item) => (
            <li onClick={() => close(false)} key={item.id}>
              <Link href={`/movies/genre/${item.id}?${item.name}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <TvGenre close={close} />
      </div>
    )
  );
};

export default Genre;

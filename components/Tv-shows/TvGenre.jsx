"use client";
import Link from "next/link";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const TvGenre = ({ close }) => {
  const { data, isLoading } = useSWR(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher
  );

  return (
    data && (
      <div>
        <ul className="grid justify-center items-center gap-x-5 md:grid-cols-2">
          {data.genres.map((item) => (
            <li onClick={() => close(false)} key={item.id}>
              <Link href={`/tv-shows/genre/${item.id}?${item.name}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default TvGenre;

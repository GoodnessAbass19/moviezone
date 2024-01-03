import Image from "next/image";
import Link from "next/link";

const Movie = ({ title, poster_path, release_date, id, vote }) => {
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div key={id}>
      <Link
        href={`/movies/${id}-${title}`}
        className="brightness-90 hover:brightness-105"
      >
        <Image
          src={imagePath + poster_path}
          alt={title}
          width={500}
          height={300}
          className="w-full h-fit rounded-md"
          priority
        />
        <h2 className="text-base font-semibold text-center line-clamp-1">
          {title}
        </h2>
        {/* <progress max="100" value={vote * 10}></progress> */}
      </Link>
    </div>
  );
};

export default Movie;

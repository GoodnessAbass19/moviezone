import Image from "next/image";
import Link from "next/link";

const Tv = ({ title, poster_path, release_date, id }) => {
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div key={id}>
      <Link
        href={`/tv-shows/${id}-${title}`}
        className="brightness-90 hover:brightness-105"
      >
        <Image
          src={imagePath + poster_path}
          alt={title}
          width={500}
          height={300}
          priority
          className="w-full h-fit rounded-md"
        />
        <h2 className="text-base font-semibold text-center line-clamp-1">
          {title}
        </h2>
      </Link>
    </div>
  );
};

export default Tv;

import Images from "@/components/Image";
import TvCast from "@/components/Tv-shows/TvCast";
import TvSimilar from "@/components/Tv-shows/TvSimilar";
import Tvideo from "@/components/Tv-shows/Tvideos";
import Image from "next/image";

export async function generateStaticParams() {
  const data = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const res = await data.json();

  if (!res || !Array.isArray(res.results)) {
    // Handle the case where the response or results are not as expected
    return [];
  }

  return res.results.map((movie) => ({
    params: {
      movie: String(movie.id),
    },
  }));
}

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${padToTwoDigits(hours)}h ${padToTwoDigits(minutes)}m`;
}

function padToTwoDigits(num) {
  return num.toString().padStart(2);
}

const TvShowsDetails = async ({ params }) => {
  const { id } = params;
  const imagePath = "https://image.tmdb.org/t/p/original";
  const data = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=images`
  );
  const movie = await data.json();
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const req = await res.json();

  const video = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=a6a239075f2d88a7adbd9adec3b60023`
  );
  const films = await video.json();

  let number = movie.vote_average;
  let maximumValue = 10;
  let percentage = (number / maximumValue) * 100;
  percentage = Math.max(1, Math.min(percentage, 100));
  let result = percentage.toFixed(0) + "%";

  return (
    <div className="lg:mt-5">
      <div className="w-full xl:block hidden">
        <div
          style={{ backgroundImage: `url(${imagePath + movie.backdrop_path})` }}
          className="bg-contain bg-right-top bg-no-repeat flex flex-col w-full min-h-[70vh] space-y-20 justify-center items-center"
        >
          <div className=" bg-sky-800/80 w-full min-h-[70vh]"></div>
          <div className="max-w-screen-xl mx-auto mt-20 absolute grid grid-rows-3 grid-flow-col gap-5 justify-between items-center py-20 px-5">
            <div className="row-span-3 relative rounded-md">
              <div>
                <Images pics={movie.images.posters} />
              </div>
              <Image
                src={imagePath + movie.poster_path}
                width={300}
                height={450}
                alt={movie.name}
                priority
                className="rounded-md max-w-xs object-cover 2xl:min-h-[550px] xl:min-h-[450px]"
              />
            </div>

            <div className="col-span-2 gap-2.5 grid">
              <h2 className="text-4xl font-semibold">{movie.name}</h2>
              <div className="flex flex-wrap gap-5">
                <h4 className="text-lg font-semibold">
                  {movie.last_air_date}{" "}
                  <span>({movie.production_countries[0].iso_3166_1})</span>
                </h4>
                <h4 className="text-lg font-semibold flex gap-2">
                  {movie.genres.slice(0, 3).map((item, i) => (
                    <div key={i}>
                      <h4 className="after:content-['.']">{item.name}</h4>
                    </div>
                  ))}
                </h4>
              </div>{" "}
              <p className="text-xl font-normal font-montserrat text-gray-400">
                {movie.tagline}{" "}
              </p>
              <div className="flex gap-10 items-center">
                <Tvideo movies={films} />
                <h3 className="bg-green-500 font-semibold text-white rounded-md p-1.5">
                  {movie.status}
                </h3>
                <h3 className="text-lg font-semibold">
                  Viewers-rating: {result}
                </h3>
              </div>
            </div>
            <div className="row-span-2 col-span-2 space-y-5">
              <div className="gap-2.5 grid">
                <h2 className="text-2xl font-semibold">Overview</h2>
                <p className="text-base font-semibold">{movie.overview}</p>
              </div>

              <div className="flex justify-between items-center flex-wrap">
                {req.cast.slice(0, 3).map((item) => (
                  <div key={item.id}>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-xl font-normal font-montserrat text-gray-400">
                      Character
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center flex-wrap">
                {req.crew.slice(0, 3).map((item) => (
                  <div key={item.id}>
                    <h3 className="text-2xl font-semibold">{item.name}</h3>
                    <p className="text-xl font-normal font-montserrat text-gray-400">
                      {item.jobs[0].job}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <TvCast cast={req} />
        <div className="bg-white w-full mt-10">
          <h3 className="text-3xl font-semibold text-black text-center">
            <span className="border-b-4 border-blue-800">Production</span>
          </h3>
          <div className="flex flex-wrap justify-center items-center py-5 gap-10">
            {movie.production_companies.map((item) => (
              <div key={item.id}>
                <Image
                  src={imagePath + item.logo_path}
                  alt={item.id}
                  width={600}
                  height={600}
                  className="max-w-[200px] object-contain"
                />
                <p className="text-center p-3 text-black text-xl font-semibold">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <TvSimilar movies={id} />
      </div>

      <div className="w-full block xl:hidden">
        <div
          style={{ backgroundImage: `url(${imagePath + movie.backdrop_path})` }}
          className="bg-right-top bg-no-repeat object-cover bg-contain min-h-[29vh] md:min-h-[35vh] lg:min-h-[60vh] scale-100"
        >
          <div className=" bg-sky-800/80 w-full md:min-h-[35vh] min-h-[29vh] lg:min-h-[60vh] absolute pb-10"></div>

          <div className="max-w-screen-xl mx-auto mt-10 absolute justify-center items-center flex flex-col">
            <div className=" mx-10">
              <Image
                src={imagePath + movie.poster_path}
                width={300}
                height={450}
                alt={movie.title}
                priority
                className="rounded-md md:max-w-[200px] max-w-[100px] object-cover md:min-h-[200px] "
              />
            </div>
          </div>
        </div>
        <div className="mx-auto text-center flex flex-col gap-6 p-5">
          <h2 className="md:text-4xl text-2xl text-center font-semibold">
            {movie.name}
          </h2>
          <div className="flex flex-wrap gap-5 justify-center items-center">
            <h4 className="text-lg font-semibold">
              {movie.last_air_date}
              <span>({movie.production_countries[0].iso_3166_1})</span>
            </h4>
            <h4 className="text-lg font-semibold flex gap-2">
              {movie.genres.slice(0, 3).map((item, i) => (
                <div key={i}>
                  <h4 className="after:content-[',']">{item.name}</h4>
                </div>
              ))}
            </h4>
          </div>
          <p className="text-xl font-normal font-montserrat text-gray-400">
            {movie.tagline}{" "}
          </p>
          <div className="flex gap-5 md:gap-10 items-center justify-center">
            <Tvideo movies={films} />
            <h3 className="bg-green-500 md:text-lg font-semibold text-white rounded-md p-1.5">
              {movie.status}
            </h3>
            <h3 className="md:text-lg text-base font-semibold">
              Viewers-rating: {result}
            </h3>
          </div>

          <div className="space-y-5 md:pb-10">
            <div className="gap-1.5 grid text-start">
              <h2 className="text-2xl font-semibold ">Overview</h2>
              <p className="text-base font-semibold">{movie.overview}</p>
            </div>
            <div className="flex justify-between items-center gap-5 flex-wrap">
              {req.cast.slice(0, 3).map((item) => (
                <div key={item.id}>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-lg font-normal font-montserrat text-gray-400">
                    character
                  </p>
                </div>
              ))}
              {req.crew.slice(0, 3).map((item) => (
                <div key={item.id}>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-lg font-normal font-montserrat text-gray-400">
                    {item.job}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <TvCast cast={req} />
        <div className="bg-white w-full mt-10">
          <h3 className="text-3xl font-semibold text-black text-center">
            <span className="border-b-4 border-blue-800">Production</span>
          </h3>
          <div className="flex flex-wrap justify-center items-center py-5 gap-10">
            {movie.production_companies.map((item) => (
              <div key={item.id}>
                <Image
                  src={imagePath + item.logo_path}
                  alt={item.id}
                  width={600}
                  height={600}
                  className="max-w-[200px] object-contain"
                />
                <p className="text-center p-3 text-black text-xl font-semibold">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <TvSimilar movies={id} />
      </div>
    </div>
  );
};

export default TvShowsDetails;

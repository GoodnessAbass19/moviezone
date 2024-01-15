import HomePage from "@/components/Home/HomePage";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
      // style={{ backgroundImage: `url(/Sci-Fi-Movies.jpg)` }}
      className="max-w-full mx-auto mt-5  bg-center bg-cover bg-blend-screen h-[100vh] bg-background"
    >
      <div className="w-full bg-black/50 absolute h-screen"></div>

      <div className="w-full absolute h-full mt-20 overflow-hidden">
        <div className="mx-auto flex flex-col justify-center items-center max-w-screen-md">
          <h2 className="text-center text-white font-semibold lg:text-4xl text-2xl capitalize">
            Welcome to Movie zone where you can check out different movies and
            tv-shows and also their trailer
          </h2>
          <button className="bg-cyan-500 p-3 m-5 rounded-md text-2xl font-semibold">
            <Link href={"home"}>View website</Link>
          </button>
        </div>
      </div>
    </main>
  );
}

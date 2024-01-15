"use client";
import Link from "next/link";
import {
  Bars3BottomRightIcon,
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Genre from "./Movies/Genre";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  const ImageUrl = "https://lh3.googleusercontent.com/a";
  const router = useRouter();
  const [arrowMenu, setArrowMenu] = useState(false);
  const [arrowUp, setArrowUp] = useState(false);
  const [arrow, setArrow] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  const [query, setQuery] = useState("");
  const [menu, setMenu] = useState(false);
  const ref = useRef(null);
  const targetRef = useRef(null);
  const dropDown = () => {
    setArrowMenu(!arrowMenu);
  };
  const drop = () => {
    setArrowUp(!arrowUp);
  };
  const drop_1 = () => {
    setArrow(!arrow);
  };
  const drop_2 = () => {
    setArrowDown(!arrowDown);
  };

  return (
    <nav className="bg-white fixed z-[999] w-full top-0">
      <div className="text-black lg:py-5 py-3 md:mx-2 lg:mx-6 md:block hidden gap-10">
        <div className=" lg:pt-3 flex flex-row  lg:mx-5 justify-between items-center">
          <Link href={"/"}>
            <h2 className="lg:text-4xl inline-block text-2xl font-semibold head uppercase text-center">
              MovieZone
            </h2>
          </Link>
          <ul className="flex flex-row gap-3  lg:gap-12 md:text-xl text-base justify-between items-center">
            <li className="text-black hover:border-b-2 border-cyan-500 px-1 text-center md:text-xl text-base">
              <Link href={"/home"} className="active:text-red-500">
                Home
              </Link>
            </li>
            <li
              className=" flex items-center gap-x-1 cursor-pointer"
              onClick={drop}
            >
              <span className="capitalize opacity-75">Movies</span>

              <span>
                {arrowUp ? (
                  <ChevronUpIcon width={18} />
                ) : (
                  <ChevronDownIcon width={18} />
                )}
                {arrowUp && (
                  <div className=" absolute z-[999] top-20 bg-black p-5 rounded-md flex flex-col gap-y-5">
                    <Link
                      href="/movies"
                      className=" text-white hover:border-b-2 hover:border-b-cyan-500"
                    >
                      Popular
                    </Link>
                    <Link
                      href="/movies/now-playing"
                      className=" text-white hover:border-b-2 hover:border-b-cyan-500"
                    >
                      Now Playing
                    </Link>
                    <Link
                      href="/movies/upcoming"
                      className=" text-white hover:border-b-2 hover:border-b-cyan-500"
                    >
                      Upcoming
                    </Link>
                    <Link
                      href="/movies/top-rated"
                      className=" text-white hover:border-b-2 hover:border-b-cyan-500"
                    >
                      Top Rated
                    </Link>
                  </div>
                )}
              </span>
            </li>
            <li
              className=" flex items-center gap-x-1 cursor-pointer"
              onClick={dropDown}
            >
              <span className="capitalize opacity-75">Tv</span>

              <span>
                {arrowMenu ? (
                  <ChevronUpIcon width={18} />
                ) : (
                  <ChevronDownIcon width={18} />
                )}
                {arrowMenu && (
                  <div className=" absolute z-[999] top-20 bg-black p-5 rounded-md flex flex-col gap-y-5">
                    <Link
                      href="/tv-shows"
                      className=" text-white hover:border-b-2 hover:border-b-cyan-500"
                    >
                      Popular
                    </Link>
                    <Link
                      href="/tv-shows/airing-today"
                      className=" text-white hover:border-b-2 hover:border-b-cyan-500"
                    >
                      Airing Today
                    </Link>
                    <Link
                      href="/tv-shows/on-the-air"
                      className=" text-white hover:border-b-2 hover:border-b-cyan-500"
                    >
                      On Air
                    </Link>
                    <Link
                      href="/tv-shows/top-rated"
                      className=" text-white hover:border-b-2 hover:border-b-cyan-500"
                    >
                      Top Rated
                    </Link>
                  </div>
                )}
              </span>
            </li>
            <li
              className=" flex items-center gap-x-1 cursor-pointer"
              onClick={drop_2}
            >
              <span className="capitalize opacity-75">Genres</span>
              <span>
                {arrowDown ? (
                  <ChevronUpIcon width={18} />
                ) : (
                  <ChevronDownIcon width={18} />
                )}{" "}
                {arrowDown && (
                  <div className=" absolute z-[999] md:top-16 lg:top-24 right-40 bg-black text-white p-5 rounded-md flex flex-col gap-y-5">
                    <Genre />
                  </div>
                )}
              </span>
            </li>
          </ul>
          <div className="flex justify-center items-center gap-2.5 lg:gap-5 xl:gap-10">
            <div className="flex items-center justify-end">
              <input
                ref={ref}
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="search"
                className="border-2 border-blue-800 rounded-full lg:p-2.5 p-1 lg:basis-4/5 inline-block text-start"
              />

              <button
                onClick={() => (ref.current.value = "")}
                className="bg-blue-600 rounded-full  lg:p-2.5 p-1 absolute inline-block"
              >
                <div onClick={() => router.push(`/search/${query}`)}>
                  <MagnifyingGlassIcon className="w-7 h-7" />
                </div>
              </button>
            </div>

            {/* <div>
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="bg-green-500 text-xl font-medium rounded-lg p-2.5"
                >
                  <Image
                    width={50}
                    height={50}
                    alt={session.user.name}
                    src={session.user.image}
                    className="rounded-full object-cover"
                  />
                </button>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="bg-green-500 text-xl font-medium rounded-lg p-2.5"
                >
                  sign In
                </button>
              )}
            </div> */}
          </div>
        </div>
      </div>

      <div className="md:hidden block z-[999] w-full">
        <div className="flex flex-row z-[999] justify-between items-center mx-5">
          <div className="z-[999]">
            {menu ? (
              <XMarkIcon
                className={`w-7 h-7 text-black ${
                  menu ? "text-white" : "text-black"
                }`}
                onClick={() => setMenu(!menu)}
              />
            ) : (
              <Bars3Icon
                className="w-7 h-7 text-black"
                onClick={() => setMenu(!menu)}
              />
            )}
          </div>
          <Link href={"/"} className="basis-4/5 text-center">
            <h2 className="inline-block text-3xl font-semibold head capitalize text-center">
              MovieZone
            </h2>
          </Link>
        </div>
        <div className="flex justify-center items-center py-2.5">
          <div className="flex items-center justify-end text-black">
            <input
              ref={targetRef}
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search"
              className="border-2 border-blue-800 rounded-full lg:p-2.5 p-1 basis-4/5 px-5 text-start inline-block"
            />

            <button
              onClick={() => (targetRef.current.value = "")}
              className="bg-blue-600 rounded-full  lg:p-2.5 p-1.5 absolute inline-block"
            >
              <div onClick={() => router.push(`/search/${query}`)}>
                <MagnifyingGlassIcon className="w-5 h-5 text-black" />
              </div>
            </button>
          </div>
        </div>
        <div>
          <div
            className={`md:hidden text-white absolute w-2/3 pt-10 h-screen z-[9] px-7 py-2 font-medium bg-black top-0 duration-300 ${
              menu ? "left-0" : "left-[-100%]"
            }`}
          >
            <ul className="flex flex-col justify-start h-full gap-10 py-2 text-lg">
              <li className="text-white text-lg">
                <Link
                  onClick={() => setMenu(!menu)}
                  href={"/"}
                  className="active:text-red-500"
                >
                  Home
                </Link>
              </li>
              <li
                className=" flex items-center gap-x-1 cursor-pointer"
                onClick={drop}
              >
                <span className="capitalize opacity-75">Movies</span>

                <span>
                  {arrowUp ? (
                    <ChevronUpIcon width={18} />
                  ) : (
                    <ChevronDownIcon width={18} />
                  )}
                  {arrowUp && (
                    <div className=" absolute z-[999] text-base bg-black p-5 rounded-md flex flex-col gap-y-5">
                      <Link
                        href="movies"
                        className=" text-white hover:border-b-2 hover:border-b-cyan-500"
                        onClick={() => setMenu(!menu)}
                      >
                        Popular
                      </Link>
                      <Link
                        href="movies/now-playing"
                        className=" text-white hover:border-b-2 hover:border-b-cyan-500"
                        onClick={() => setMenu(!menu)}
                      >
                        Now Playing
                      </Link>
                      <Link
                        href="movies/upcoming"
                        className=" text-white hover:border-b-2 hover:border-b-cyan-500"
                        onClick={() => setMenu(!menu)}
                      >
                        Upcoming
                      </Link>
                      <Link
                        href="movies/top-rated"
                        className=" text-white hover:border-b-2 hover:border-b-cyan-500"
                        onClick={() => setMenu(!menu)}
                      >
                        Top Rated
                      </Link>
                    </div>
                  )}
                </span>
              </li>
              <li
                className=" flex items-center gap-x-1 cursor-pointer"
                onClick={dropDown}
              >
                <span className="capitalize opacity-75">Tv</span>

                <span>
                  {arrowMenu ? (
                    <ChevronUpIcon width={18} />
                  ) : (
                    <ChevronDownIcon width={18} />
                  )}
                  {arrowMenu && (
                    <div className=" absolute z-[999] bg-black p-5 rounded-md flex flex-col gap-y-5">
                      <Link
                        href="tv-shows"
                        className=" text-white hover:border-b-2 hover:border-b-cyan-500"
                        onClick={() => setMenu(!menu)}
                      >
                        Popular
                      </Link>
                      <Link
                        href="tv-shows/airing-today"
                        className=" text-white hover:border-b-2 hover:border-b-cyan-500"
                        onClick={() => setMenu(!menu)}
                      >
                        Airing Today
                      </Link>
                      <Link
                        href="tv-shows/on-the-air"
                        className=" text-white hover:border-b-2 hover:border-b-cyan-500"
                        onClick={() => setMenu(!menu)}
                      >
                        On Air
                      </Link>
                      <Link
                        href="tv-shows/top-rated"
                        className=" text-white hover:border-b-2 hover:border-b-cyan-500"
                        onClick={() => setMenu(!menu)}
                      >
                        Top Rated
                      </Link>
                    </div>
                  )}
                </span>
              </li>
              <li
                className=" flex items-center gap-x-1 cursor-pointer"
                onClick={drop_2}
              >
                <span className="capitalize opacity-75">Genres</span>
                <span>
                  {arrowDown ? (
                    <ChevronUpIcon width={18} />
                  ) : (
                    <ChevronDownIcon width={18} />
                  )}{" "}
                  {arrowDown && (
                    <div className="text-white absolute z-[999] bg-black p-5 rounded-md flex flex-col gap-y-5 left-0">
                      <Genre close={setMenu} />
                    </div>
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

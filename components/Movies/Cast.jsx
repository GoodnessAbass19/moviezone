"use client";
import Image from "next/image";
// import React from "react";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const Cast = ({ cast }) => {
  const imagePath = "https://image.tmdb.org/t/p/original";
  return (
    <div className="w-full mt-20 max-w-screen-lg md:mx-auto px-5">
      <h2 className="text-3xl capitalize font-semibold">Top cast</h2>
      <Swiper
        scrollbar={{ draggable: true, snapOnRelease: true }}
        slidesPerView={2}
        spaceBetween={20}
        breakpoints={{
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          912: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          500: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        modules={[Scrollbar]}
        className="max-w-screen-lg mx-auto md:py-10 py-5 mySwiper mt-5"
      >
        {cast.cast.slice(0, 10).map((item) => (
          <SwiperSlide
            key={item.id}
            className=" rounded-md bg-white items-center text-black max-w-[180px] max-h-[270px] "
          >
            <div href={""} className="">
              <Image
                src={imagePath + item.profile_path}
                width={500}
                height={500}
                priority
                alt={item.name}
                className="w-full h-[175px] object-cover "
              />
              <h4 className="text-base font-semibold text-center">
                {item.name}
                <p className="text-sm p-1.5">{item.character}</p>
                {/* <p className="text-sm p-1.5">{item.roles[0].character}</p> */}
              </h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Cast;

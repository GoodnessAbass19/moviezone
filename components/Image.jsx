"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import { ArrowsPointingOutIcon, XMarkIcon } from "@heroicons/react/24/solid";

// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Images = ({ pics }) => {
  const [image, setImage] = useState(false);
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div>
      <button
        onClick={() => setImage(!image)}
        className="absolute opacity-0 hover:opacity-100 h-full hover:backdrop-blur-md bg-black/30 w-full text-xl font-semibold flex justify-center items-center"
      >
        <ArrowsPointingOutIcon className="text-white w-10 h-10" />
        Expand
      </button>

      {image && (
        <div className="fixed bg-black/60 z-[999] w-full h-screen top-0 left-0">
          <div className="relative  justify-center items-center rounded-md p-5  border-md md:max-w-screen-md max-w-xs mx-auto right-10 w-full h-full xl:inset-y-20">
            <div className="flex justify-end items-end">
              <button onClick={() => setImage(false)} className="text-white">
                {" "}
                <XMarkIcon className="text-2xl w-10 h-10" />{" "}
              </button>
            </div>
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
              }}
              spaceBetween={30}
              effect={"fade"}
              navigation={true}
              keyboard={{
                enabled: true,
              }}
              // pagination={{
              //   clickable: true,
              // }}
              slidesPerView={1}
              modules={[EffectFade, Navigation, Pagination]}
              className="max-w-screen-md xl:h-[600px] lg:h-[500px] flex flex-col justify-center items-center"
            >
              {pics.slice(0, 20).map((img) => (
                <SwiperSlide>
                  <Image
                    src={imagePath + img.file_path}
                    width={500}
                    height={500}
                    className="w-full h-full px-10 object-contain"
                    priority
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default Images;

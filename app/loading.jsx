"use client";

import { ColorRing } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <ColorRing
        visible={true}
        height="180"
        width="180"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};

export default Loading;

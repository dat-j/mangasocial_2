import React from "react";

const NewsComicCard = (props) => {
  const { poster, time, title, url } = props;
  return (
    <div className="rounded-xl group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
      <div className="w-[417px] h-[287px]">
        <img

          className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
          src="https://www.shutterstock.com/image-vector/anime-manga-girl-eyes-looking-600nw-2324145071.jpg"
          alt=""
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/30"></div>
      <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 mb-5">
        <h1 className="font-dmserif text-xl  font-bold text-white -mt-48">
          {title}
        </h1>
        <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {time}
        </p>
      </div>
    </div>
  );
};

export default NewsComicCard;

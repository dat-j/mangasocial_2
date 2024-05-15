import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const ChapterCard = ({ chapter, title, poster, des, slug }) => {
  const sv = useSelector((state)=>state.server.sv);
  const chapterNumber = chapter.replace(`http://apimanga.mangasocial.online/rmanga/${slug}/`, '');
  console.log(chapterNumber)

  const truncatedDes = des.length > 50 ? `${des.slice(0, 50)}...` : des;
  return (
    <NavLink to={`/chapter/${slug}/${chapterNumber}`}>
      <div className=" flex items-center gap-[239px] cursor-pointer py-[24px] px-[48px] hover:bg-[#000] border-b-2 border-gray-500 rounded-xl">
        {/* chapter info */}
        <div className="flex items-center gap-[12px] ">
          <img src={poster} alt="" className="h-[172px] w-[172px] bg-cover bg-no-repeat rounded-xl bg-center" />
          <div>
            <div className="text-[24px] font-semibold leading-[32px] text-white ">
              {`${title} . ${chapterNumber} `}
            </div>
            <div className="text-[22px] font-semibold leading-[28px] text-white ">
              12/07/2023
            </div>
          </div>
        </div>
        <div className="text-[24px] leading-[32px] font-semibold text-white">
          {truncatedDes}
        </div>
        <div className="text-[24px] leading-[32px] font-semibold text-white">
          Login
        </div>
      </div>
    </NavLink>
  );
};

export default ChapterCard;

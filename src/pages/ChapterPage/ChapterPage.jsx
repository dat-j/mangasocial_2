import React, { useEffect, useState } from "react";
import "./ChapterPage.scss";
import ChapterCard from "../../components/ChapterCard/ChapterCard";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Comments from "../../components/comments";
import CMT from "../../components/cmt";
import { Buffer } from "buffer";
import  Cookies  from "js-cookie";
import CMT_list from "./../../components/cmt_list";

const ChapterPage = () => {
  const [showTab, setShowTab] = useState(true);
  const [chapterDetail, setChapterDetail] = useState([]);
  const [visibleChapterCount, setVisibleChapterCount] = useState(12);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [comment, setComment] = useState("");
  const params = useParams();
  const { slug } = params;
  const sv = useSelector((state)=>state.server.sv);
  const readmode = useSelector((state)=>state.ReadMode.readmode);
  const user_id = sessionStorage.getItem("user_id")
  
  const handleShowTab = () => {
    setShowTab(!showTab);
  };
  const commentOnchange = (e) => {
    setComment(e.target.value)
  };
  const handleSendComment = async () =>{
    try {
      const res = await axios.post(`https://apimanga.mangasocial.online/cmanga/${slug}/${user_id}/`,{content:comment})
      console.log("response:",res)
      console.log("comment:",comment)
    } catch (error) {
      console.log(error)
      console.log("comment:",comment)
      console.log(slug)
    }
  }
  const fetchChapterDetail = async () => {
    try {
      if(readmode==false){
        const response = await axios.get(
          `https://apimanga.mangasocial.online/rmanga/${slug}`
        );
        setChapterDetail(response.data);
      console.log("chapter detail:",response.data)
      }
      else{
        const response = await axios.get(
          `https://apimanga.mangasocial.online/web/rmanga/${sv}/${slug}/`
        );
        setChapterDetail(response.data);
      console.log("chapter detail:",response.data)
      }
      
    } catch (error) {
      console.log(error);
      console.log("slug:", slug)
    }
  };

  useEffect(() => {
    fetchChapterDetail();
  }, []);

  const handleSeeMore = () => {
    setVisibleChapterCount((prevCount) => prevCount + 10);
  };

  const sortedChapters = chapterDetail[0]?.chapters.sort((a, b) => {
    // Lấy 3 số sau ký tự "chapter-"
    const getLastNumber = (url) =>
      parseInt(
        url.slice(url.indexOf("chapter-") + 8, url.indexOf("chapter-") + 11),
        10
      );

    const chapterNumberA = getLastNumber(a);

    const chapterNumberB = getLastNumber(b);

    return chapterNumberA - chapterNumberB;
  });

  const viewsString = chapterDetail?.views || "";
  const startIndex = viewsString.lastIndexOf("has ") + 4;
  const viewsPart = viewsString.substring(startIndex);
  const truncatedDescription =
    chapterDetail?.description?.slice(0, 180) + "... ";
  const fullDescription = chapterDetail?.description;

  let listServer = [
    { src: '/images/ChapterPage/GB.png', title: 'GB' },
    { src: '/images/ChapterPage/ES.png', title: 'ES' },
    { src: '/images/ChapterPage/FR.png', title: 'FR' },
    { src: '/images/ChapterPage/HU.png', title: 'HU' },
    { src: '/images/ChapterPage/DK.png', title: 'DK' },
    { src: '/images/ChapterPage/IT.png', title: 'IT' },
    { src: '/images/ChapterPage/SA.png', title: 'SA' },
  ]

  return (
    <div style={{ zoom: 0.9 }}>
      <div
        className=" w-[100%] h-full bg-cover bg-center bg-no-repeat md:flex md:gap-30 px-[14px] pt-[14px] md:px-[141px] md:pt-[48px] gap-10"
        style={{
          backgroundImage: "url('/images/ChapterPage/bia.png')",
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%), url('/images/ChapterPage/bia.png'), lightgray 50% / cover no-repeat",
        }}
      >
        <div className="relative">
          <img
            src={chapterDetail?.poster}
            alt=""
            className=" h-[203px] w-[330px] md:h-[649px] md:w-[433px] bg-cover object-cover bg-center rounded-[8px]"
          />
          <div className="absolute top-0 right-5  hidden md:block ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="118"
              height="118"
              viewBox="0 0 118 118"
              fill="none"
            >
              <path
                d="M0 0H118V59C118 91.5848 91.5848 118 59 118C26.4152 118 0 91.5848 0 59V0Z"
                fill="#1E1E1E"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="118"
                height="118"
                viewBox="0 0 118 118"
                fill="none"
              >
                <path
                  d="M0 0H118V59C118 91.5848 91.5848 118 59 118C26.4152 118 0 91.5848 0 27.8K like59V0Z"
                  fill="#1E1E1E"
                />
                <text
                  x="10%"
                  y="50%"
                  fontSize="57px"
                  fontWeight="bold"
                  fill="white"
                  tex="middle"
                  dominantBaseline="middle"
                >
                  18+
                </text>
              </svg>
            </svg>
          </div>
          <div className="absolute top-0 left-0 hidden md:block ">
            <div className="relative ">
              <img
                src="/images/ChapterPage/Star 1.png"
                alt=""
                className="h-[144px] w-[144px]"
              />
              <div className="h-[64px] w-[125px] text-white font-semibold text-[24px] leading-[32px] absolute top-[30px] left-[10px]  text-center">
                New Chapter
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[8px] md:gap-5">
          <div className="flex flex-col gap-[8px] md:gap-[40px]">
            {/* name && tương tác */}
            <div className="flex flex-col gap-[8px] md:gap-[21px]">
              <div className="font-semibold text-[14px] leading-[20px] md:text-[45px] md:leading-[52px] text-white">
                {chapterDetail?.title}
              </div>
              {/* tương tác */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 font-medium text-[11px] leading-[16px]  md:font-semibold md:text-[22px] md:leading-[28px] text-white ">
                  <img
                    src="/images/ChapterPage/carbon_view-filled.png"
                    alt=""
                    className="h-[32px] w-[32px] hidden md:block "
                  />
                  <div>{`${viewsString} views`}</div>
                </div>
                <div className="flex items-center gap-2 font-medium text-[11px] leading-[16px] md:font-semibold md:text-[22px] md:leading-[28px] text-white ">
                  <img
                    src="/images/ChapterPage/mdi_like.png"
                    alt=""
                    className="h-[32px] w-[32px] hidden md:block"
                  />
                  <div>27.8K like</div>
                </div>
                <div className="flex items-center gap-2 font-medium text-[11px] leading-[16px] md:font-semibold md:text-[22px] md:leading-[28px] text-white ">
                  <img
                    src="/images/ChapterPage/jam_files-f.png"
                    alt=""
                    className="h-[32px] w-[32px] hidden md:block"
                  />
                  <div>{`${chapterDetail[0]?.chapters.length} chapter `} </div>
                </div>
              </div>
            </div>

            {/* server && button */}
            <div className="flex flex-col gap-[40px]">
              {/* button */}
              <div className="flex  gap-5">
                <button className=" p-[8px]  rounded-[12px] md:px-[52px] md:py-[26px]  bg-[#FF2020]  text-white md:rounded-[67px] ">
                  <div className="font-bold text-[12px] leading-[16px] md:text-[36px] md:leading-[44px] ">
                    Read now
                  </div>
                </button>
                <button className=" p-[8px]  rounded-[12px] text-black md:px-[52px] md:py-[26px]   bg-[#496EF1]  md:text-white md:rounded-[67px]">
                  <div className="font-bold text-[12px] leading-[16px] md:text-[36px] md:leading-[44px] flex gap-1 md:gap-3 ">
                    <div> My List </div>
                    <img
                      src="/images/ChapterPage/uil_plus.png"
                      alt=""
                      className="h-[20px] w-[20px] md:h-[48px] md:w-[48px] bg-cover object-cover "
                    />
                  </div>
                </button>
                <button className=" p-[8px]  rounded-[12px] md:px-[52px] md:py-[26px] bg-[#F45F17]  text-white md:rounded-[67px]">
                  <div className="font-bold text-[12px] leading-[16px] md:text-[36px] md:leading-[44px] flex gap-1 md:gap-3 ">
                    <div>{chapterDetail?.rate}</div>
                    <img
                      src="/images/ChapterPage/Star 3.png"
                      className="h-[20px] w-[20px] md:h-[48px] md:w-[48px] bg-cover object-cover"
                      alt=""
                    />
                  </div>
                </button>
              </div>
              {/* chọn server */}
              <div className="flex flex-col gap-[10px]">
                <div className=" font-bold text-[12px] leading-[16px]  md:text-[28px] md:leading-[36px] text-white ">
                  Server
                </div>
                <div className="flex flex-wrap items-center justify-between">
                  {listServer.map((item, index) => (
                    <img
                      key={index}
                      src={item?.src}
                      alt={item?.title}
                      title={item?.title}
                      className="w-[32px] h-[23px]  md:h-[48px]  md:w-[67px] cursor-pointer hover:opacity-80"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[8px] md:gap-[40px]">
              {/* info chapter */}
              <div className="flex flex-col gap-[8px] md:gap-[16px]">
                <div className="text-[#9E9E9E] font-normal text-[12px] leading-[16px] md:text-[24px]  md:leading-[36px] flex items-center gap-2">
                  Author:
                  <div className="text-white">{chapterDetail?.author}</div>
                </div>
                <div className="text-[#9E9E9E] font-normal text-[12px] leading-[16px] md:text-[24px]  md:leading-[36px] flex items-center gap-2">
                  Artist:
                  <div className="text-white">Some Name</div>
                </div>
                <div className="text-[#9E9E9E] font-normal text-[12px] leading-[16px] md:text-[24px]  md:leading-[36px] flex flex-wrap items-center gap-2">
                  Genres:
                  <div className="text-white">
                    {chapterDetail?.categories}
                  </div>
                </div>
                <div className="text-[#9E9E9E] font-normal text-[12px] leading-[16px] md:text-[24px]  md:leading-[36px] flex items-center gap-2">
                  Age:
                  <div className="text-white">18+</div>
                </div>
                {/* desc */}
                <div className="">
                  <p className="w-[223px] h-auto text-[11px] font-medium leading-[16px]  md:w-[1000px] md:font-normal md:text-[24px] md:leading-[36px] text-white">
                    {showFullDescription
                      ? fullDescription
                      : truncatedDescription}
                    {!showFullDescription && (
                      <button onClick={() => setShowFullDescription(true)}>
                        <div className=" underline  underline-offset-4">
                          See All
                        </div>
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-[12px] flex items-center justify-center gap-[47px] md:gap-[87px] bg-[#3C3B38]">
        <div
          className={` ${showTab ? "tabbtn" : " none-tab "} `}
          onClick={handleShowTab}
        >
          Chapter
        </div>
        <div
          className={` ${!showTab ? "tabbtn" : " none-tab "} `}
          onClick={handleShowTab}
        >
          Comment
        </div>
      </div>
      <div>
        {showTab && (
          <div className="bg-[#000] flex py-[50px] px-[100px] justify-center">
            <div className="bg-[#4A4A4A] py-[24px] px-[48px]">
              <div className="flex items-center gap-2 font-semibold text-[22px] leading-[28px] text-white ">
                <img
                  src="/images/ChapterPage/jam_files-f.png"
                  alt=""
                  className="h-[32px] w-[32px]"
                />
                {/* <div>{(chapterDetail[0]?.chapters).length} chapters</div> */}
              </div>
              <div className="px-12 py-6">
                {sortedChapters
                  ?.slice(0, visibleChapterCount)
                  .map((chapter, index) => (
                    <div key={index}>
                      <ChapterCard
                        chapter={chapter}
                        title={chapterDetail?.title}
                        des={chapterDetail?.description}
                        poster={chapterDetail?.poster}
                        slug={slug}
                      />
                    </div>
                  ))}
              </div>
              <div className="text-center mt-5">
                <button
                  className="font-semibold text-[32px] leading-[40px] text-white  "
                  onClick={handleSeeMore}
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center bg-black h-[1000vh]">
        {!showTab &&
        <div className="flex flex-col">
          <CMT_list cmt_arr={chapterDetail.comments}/>
          {/* logined user comment */}
          {sessionStorage.getItem("user_email")?
          <div>
            <div className="antialiased mx-auto max-w-screen-sm scale-150 mt-24 w-[1000px]">
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <img
                      className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                      src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                      alt=""
                    />
                  </div>
                  <div className="flex-1 border rounded-lg px-4 py-2 leading-relaxed">
                    <div className="flex items-center">
                      <strong className="text-white flex items-center">{sessionStorage.getItem("user_email")}</strong>{" "}
                      
                    </div>
                    <div className="flex flex-row gap-6">
                      <input className="text-lg text-white bg-slate-500 h-24 w-full rounded-lg my-2" onChange={(e)=>commentOnchange(e)}>
                      
                      </input>
                      <button className="bg-slate-500 rounded-lg m-2 w-[20%] text-white font-semibold" onClick={()=>handleSendComment()}>Comment</button> 
                    </div>
                  </div>
                </div>
                </div>
            </div>
          </div>
          :
          <div className="mx-auto">
            <h1 className="text-4xl text-white mt-6">Please <Link to="/login"><span className="text-[#F45F17] cursor-pointer">login</span></Link> to comment!</h1>
          </div>
          }
          

        </div>
          }
      </div>
    </div>
  );
};

export default ChapterPage;

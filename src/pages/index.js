
import CommingSoon from "../components/commingSoon";

import Rank from "../components/rank";
import ComicRecent from "../components/comicRecent";
import News from "../components/news";
import { Link } from "react-router-dom";
import NewUsers from "../components/newUsers";
import Comments from "../components/comments";
import NewRelease from "../components/newRelease";
import Page_Comedy from "./Comedy/Comedy";
import Page_Recommended from "./Recommended/Recommended";
import BestComicOfWeek from "./bestComicOfWeek/BestComicOfWeek";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Recommended from "../components/recommended";
import ComedyComics from './../components/comeryComics';
import Top15Comics from "../components/top15Comics";
import FreeComic from "../components/freeComic";
import NewsComics from "../components/newsComics";
import ToggleReadMode from "../components/ToggleBtn/ToggleReadMode";
import Loading from "../components/Loading/Loading";

export default function Index() {
  let sv = useSelector((state)=>state.server.sv);
  const readmode = useSelector((state)=>state.ReadMode.readmode);
  return (
    <>
      <div className="cont">
       
        {/* <div className="slider">
          <SliderImg
            arrImage={[slider1, slider2, slider3, slider4]}
          ></SliderImg>
          <div className="slider2">
            <SliderImg2 arrImage2={[slider5, slider6, slider7]}></SliderImg2>
          </div>
        </div>
        <img className="blur-dots" src="/images/Vector 2.svg" alt=""></img>
        <div className="background-dots"></div> */}
        <div className="title-released-comic ">
          <h2>New Released Comic</h2>
          <Link to="/newRelease">
            <p>See all</p>
          </Link>
        </div>
        <NewRelease key={readmode}/>

        <div className="title-released-comic">
          <h2>Recent Comics</h2>
          <Link to="/recent">
            <p>See all</p>
          </Link>
        </div>
        <ComicRecent ></ComicRecent>

        <div className="title-released-comic">
          <h2>Recommended Comics</h2>
          <Link to="/recommended">
            <p>See all</p>
          </Link>
        </div>
        <Recommended />
        <div className="title-released-comic">
          <h2>Comming Soon Comics</h2>
          <Link to="/commingsoon">
            <p>See all</p>
          </Link>
        </div>
        <CommingSoon></CommingSoon>

        <div className="title-released-comic">
          <h2>Top 15 Best Comics of the Week</h2>
          <Link>
            <p>See all</p>
          </Link>
        </div>
        <Top15Comics />

        <div className="title-released-comic">
          <h2>Comedy Comics</h2>
          <Link>
            <p>See all</p>
          </Link>
        </div>
        <ComedyComics />
        <div className="title-released-comic">
          <h2>Free Comics</h2>
          <Link to={`/`}>
            <p>See all</p>
          </Link>
        </div>
        <FreeComic></FreeComic>
        <div className="title-released-comic">
          <h2>News</h2>
          <Link>
            <p>See all</p>
          </Link>
        </div>
        <div className="news">
          <NewsComics />
          <NewUsers />
        </div>
        <div className="title-released-comic">
          <h2>Rank</h2>
        </div>
        <Rank></Rank>
        <div className="title-released-comic">
          <h2>Comment</h2>
        </div>
        <Comments></Comments>
        <ToggleReadMode/>
      </div>
      </>
  );
}

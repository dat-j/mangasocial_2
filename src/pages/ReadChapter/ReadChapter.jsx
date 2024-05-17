import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ButtonIcon from "../../components/buttonIcon";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Button } from "antd";
import fileDownload from "js-file-download";
import FileSaver from "file-saver";

const ReadChapter = () => {
  const params = useParams();
  const { slug, id } = params;
  const [chapterDetail, setChapterDetail] = useState([]);
  const [listChapter, setListChapter] = useState([]);
  const [chooseChapter, setChooseChapter] = useState("");
  const sv = useSelector((state) => state.server.sv);
  const readmode = useSelector((state) => state.ReadMode.readmode);
  const navigate = useNavigate();
  const fetchChapter = async () => {
    try {
      if(readmode==true){
        const response = await axios.get(
          `https://apimanga.mangasocial.online/web/rmanga/${sv}/${slug}/${id}`
        );
  
        setChapterDetail(response.data);
        console.log(chapterDetail);
      }
      else{
        const response = await axios.get(
          `https://apimanga.mangasocial.online/rmanga/${slug}/${id}`
        );
  
        setChapterDetail(response.data);
        console.log(chapterDetail);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const downloadIMG = async (imgsrc, imgname) => {
    const imgBlob = await fetch(imgsrc)
      .then((res) => res.arrayBuffer())
      .then((buffer) => new Blob([buffer], { type: "image/jpg" }));
    const link = document.createElement("a");
    link.href = URL.createObjectURL(imgBlob);
    link.download = imgname;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDownload = () => {
    console.log(chapterDetail.image_chapter.length);
    console.log(chapterDetail.image_chapter[0]);
    FileSaver.saveAs("https://genk.mediacdn.vn/139269124445442048/2023/12/6/naruto-12-6715-1701839896154-17018398969662010034558.jpg", "image.png");
    // downloadIMG("https://genk.mediacdn.vn/139269124445442048/2023/12/6/naruto-12-6715-1701839896154-17018398969662010034558.jpg",chapterDetail.chapter_name+".jpg")
    // for(let i=0;i<chapterDetail.image_chapter.length;i++){
    //   setTimeout(
    //     ()=>{
    //       // fileDownload(chapterDetail.image_chapter[i],"img_"+i+".png")

    //     },
    //     i*200
    //   )
    // }
  };
  const fetchListChapter = async () => {
    try {
      if(readmode==true){
        const response = await axios.get(
          `https://apimanga.mangasocial.online/web/rmanga/${sv}/${slug}`
        );
        setListChapter(Object.keys(response.data.chapters));
      }
      else{
        const response = await axios.get(
          `https://apimanga.mangasocial.online/${sv}/rmanga/${slug}`
        );
        setListChapter(Object.keys(response.data.chapters));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListChapter();
    // eslint-disable-next-line
  }, [slug]);

  useEffect(() => {
    fetchChapter();
    // eslint-disable-next-line
  }, [slug, id]);

  const handleChapter = (e) =>{
    let selectChapter = document.getElementById("chapterList");
    let selectedChapter = selectChapter.options[selectChapter.selectedIndex].value;
    console.log(selectedChapter);
    setChooseChapter(e.target.value);
    const linkChapter = selectedChapter.replace(`http://apimanga.mangasocial.online/rmanga/${slug}/`,
    "");
    navigate(`/chapter/${slug}/${linkChapter}`);
  }
  const handleChangeChapter = async () => {
    const nextChapter = chooseChapter.replace(
      `http://apimanga.mangasocial.online/rmanga/${slug}/`,
      ""
    );
    console.log(nextChapter);
    navigate(`/chapter/${slug}/${nextChapter}`);
    console.log("aaa");
  };

  let currentChapter = listChapter.indexOf(
    `http://apimanga.mangasocial.online/rmanga/${slug}/${id}`
  );
  console.log(currentChapter)

  const prevChapter = () => {
    if (currentChapter > 0) {
      const prev = listChapter[currentChapter - 1].replace(
        `http://apimanga.mangasocial.online/rmanga/${slug}/`,
        ""
      );
      currentChapter--;
      navigate(`/chapter/${slug}/${prev}`);
      console.log(currentChapter);
    } else {
      alert("What!!???");
    }
  };

  const nextChap = () => {
    if (currentChapter + 2 <= listChapter.length) {
      const next = listChapter[currentChapter + 1].replace(
        `http://apimanga.mangasocial.online/rmanga/${slug}/`,
        ""
      );
      console.log(currentChapter);
      navigate(`/chapter/${slug}/${next}`);
    } else {
      alert("End of manga!!!");
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 mt-5">
      <div className="flex flex-col container gap-5">
        <div className="">
          <h1 className="uppercase font-bold text-3xl">
            {chapterDetail?.title} - {chapterDetail?.chapter_name}
          </h1>
        </div>

        <div className="flex gap-3 text-lg ">
          <Link to={`/`}>Home</Link> /{" "}
          <Link to={`/chapter/${slug}`}>{chapterDetail?.title}</Link> /{" "}
          <label htmlFor="chapter name" className="font-bold">
            {chapterDetail?.chapter_name}
          </label>
        </div>

        <div className="flex justify-between items-center">
          <div className="">
            <select
              name="cars"
              id="chapterList"
              className="w-[450px] h-[40px] px-3 rounded-lg"
              onChange={(e)=>handleChapter(e)}
              value={chooseChapter}
            >
              {listChapter?.map((item, index) => (
                <option key={index} value={item} >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Button size="large" onClick={() => handleDownload()}>
              Download
            </Button>
          </div>
          <div className="flex gap-2">
            <ButtonIcon
              name={"Prev"}
              iconLeft={<GrLinkPrevious />}
              handleClick={prevChapter}
            />
            <ButtonIcon
              name={"Next"}
              iconRight={<GrLinkNext />}
              handleClick={nextChap}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center  ">
        {chapterDetail.image_chapter?.map((item, index) => (
          <div key={index}>
            <img
              src={item}
              alt=""
              className="h-[100%] w-[100%] bg-cover object-cover mt-2 "
            />
            <hr />
          </div>
        ))}
      </div>

      <div className="flex flex-col container gap-5">
        <div className="flex justify-between items-center">
          <div className="">
            <select
              name="cars"
              id="chapterList"
              className="w-[450px] h-[40px] px-3 rounded-lg"
              onChange={()=>handleChapter()}
              value={chooseChapter}
            >
              {listChapter?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <ButtonIcon
              name={"Prev"}
              iconLeft={<GrLinkPrevious />}
              handleClick={prevChapter}
            />
            <ButtonIcon
              name={"Next"}
              iconRight={<GrLinkNext />}
              handleClick={nextChap}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadChapter;

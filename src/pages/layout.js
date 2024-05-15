import { useState, useContext, useRef } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import SubMenu from "../components/SubMenu/SubMenu";
import platform from "platform";
import ios from "../pages/img/ios.png";
import adroi from "../pages/img/adroi.png";
import { CiSearch } from "react-icons/ci";
import { useEffect } from "react";
import axios from "axios";
import "../assets/scss/_dropdown.scss";
import { SviContext } from ".";
import { changeServer } from "../Redux/Feature/serverSlice";
import { useDispatch, useSelector } from "react-redux";
import Handle_function from "../handle_account/handle";
let path = "";
let arr_id_manga = [""];
let arr_url = [""];
let arr_path = [""];
export default function Layout() {
  const [isHovered, setIsHovered] = useState(false);
  const [isServerHovered, setIsServerHovered] = useState(false);
  const [link, setLink] = useState("");
  const submenuRef = useRef(null);

  //handle search
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [idMangaList, setIdMangaList] = useState("0");
  const [open, setOpen] = useState(false);
  const [checkSearch, setCheckSearch] = useState(false);
  const [url, setURL] = useState("");
  const sv = useSelector((state) => state.server.sv);
  const dispatch = useDispatch();
  function test() {
    console.log("sv:", sv);
  }
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInput((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleClickOutside = (event) => {
    if (submenuRef.current && !submenuRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const fetchData = (value) => {
    fetch("https://apimanga.mangasocial.online/")
      .then((response) => response.json())
      .then((res) => {
        console.log(res[1].data);
        // const results = data.filter((data) => {
        //     return data && data.title_manga && data.title_manga.toLowerCase().includes(value)
        // })
        // console.log(results)
      });
  };
  const fetchServer = async () => {
    try {
      const response = await axios.get("https://apimanga.mangasocial.online/all-server");
      console.log("Response: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "https://apimanga.mangasocial.online/search-manga-by-name-in-sever/" + sv,
        input
      );
      setSearchData(response.data);
      console.log(response.data);
      if (response.status == 200) {
        setCheckSearch(true);
      }
      
      let a = response.data[0].id_manga;
      let url = a.lastIndexOf("/");
      path = a.slice(url + 1, 1000);
      setSearch(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  for (let i = 0; i < searchData?.length; i++) {
    arr_id_manga[i] = searchData[i].id_manga;
    arr_url[i] = arr_id_manga[i].lastIndexOf("/");
    arr_path[i] = arr_id_manga[i].slice(arr_url[i] + 1, 1000);
  }
  console.log(arr_path);
  console.log(path);
  const handleCloseSearch = () => {
    setCheckSearch(false);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleServerMouseEnter = () => {
    setIsServerHovered(true);
  };

  const handleServerMouseLeave = () => {
    setIsServerHovered(false);
  };

  let getSessionData = () => {
    return sessionStorage.getItem("user_email");
    // return Handle_function.isAuthen
  };

  let isLogin = getSessionData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    const os = platform.os.family;

    if (os === "iOS") {
      setModalContent(ios);
      setIsModalOpen(true);
      setLink(
        "https://apps.apple.com/us/app/manga-reader-mangakomi-online/id6446646720"
      );
    } else if (os === "Android") {
      console.log("androi");
      setModalContent(adroi);
      setIsModalOpen(true);
      setLink(
        "https://play.google.com/store/apps/details?id=com.thinkdiffai.futurelove"
      );
    } else {
      console.log("Đây là laptop");
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  function changeSV(index) {
    dispatch(changeServer(index));
    this.forceUpdate();
  }
  return (
    <>
      <div className="header-top">
        <Link to="/">
          <div className="title">
            <img
              className="img-manga"
              src="/images/logo-thinkdiff.png"
              alt=""
            ></img>
            <h3>MangaSocial</h3>
          </div>
        </Link>
        <div className="menu-header">
          <Link to="/">
            <div
              className="comic"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <p>Comic</p>
              <img
                className="arrow-img"
                src={
                  isHovered
                    ? "/images/Polygon cam.svg"
                    : "/images/Polygon 1.svg"
                }
                alt="Arrow"
              />
            </div>
          </Link>

          <Link to="/genres">
            <p>Genres</p>
          </Link>

          <p>Popular</p>

          {/* <div
            className="server"
            onMouseEnter={handleServerMouseEnter}
            onMouseLeave={handleServerMouseLeave}
          >
            <p>Server</p>
            <img
              className="arrow-img"
              src={
                isServerHovered
                  ? "/images/Polygon cam.svg"
                  : "/images/Polygon 1.svg"
              }
              alt="Arrow"
            />
          </div> */}
          <div className="dropdown" >
            <button ref={submenuRef} onClick={() => handleOpen()}>Server</button>
            {open ? (
              <ul
                className="menu grid grid-cols-2"
                onClick={() => handleOpen()}
              >
                <li className="menu-item">
                  <button onClick={() => dispatch(changeServer(0))}> {/*change the server index by passing index in changeserver() function*/}
                  mangainn.net
                  </button>
                </li>
                <li className="menu-item">
                  <button onClick={() => dispatch(changeServer(1))}>
                  ww5.manganelo.tv
                  </button>
                </li>
                <li className="menu-item">
                  <button onClick={() => dispatch(changeServer(7))}>
                  readm.org
                  </button>
                </li>
                <li className="menu-item">
                  <button onClick={() => dispatch(changeServer(2))}>
                  mangareader.cc
                  </button>
                </li>
                <li className="menu-item">
                  <button onClick={() => dispatch(changeServer(6))}>
                  mangakomi.io
                  </button>
                </li>
                <li className="menu-item">
                  <button onClick={() => dispatch(changeServer(8))}>
                  mangajar.com
                  </button>
                </li>
                <li className="menu-item">
                  <button onClick={() => dispatch(changeServer(5))}>
                  mangajar.com/manga
                  </button>
                </li>
                <li className="menu-item">
                  <button onClick={() => dispatch(changeServer(18))}>
                  it.ninemanga.com
                  </button>
                </li>
                <li className="menu-item">
                  <button onClick={() => dispatch(changeServer(17))}>
                  fr.ninemanga.com
                  </button>
                </li>
                <li className="menu-item">
                  <button onClick={() => dispatch(changeServer(16))}>
                  es.ninemanga.com
                  </button>
                </li>
              </ul>
            ) : null}
          </div>
          {/* SERVER LIST       index    link
          --------------------------NOVEL------------------------------------
                                        "https://www.ninemanga.com",
                                        "https://mangajar.com/",
                                  11    "https://www.novelhall.com"
                                        "https://azoranov.com/series/",         
                                   4    "https://bestlightnovel.com/",
                                  12    "https://mto.to/",
                                        "https://ru.ninemanga.com",
                                   9    "https://swatmanga.net",
                --------------------MANGA-----------------------------                        
                                  14    "https://br.ninemanga.com",
                                  13    "https://de.ninemanga.com",
                                  16    "https://es.ninemanga.com",
                                  17    "https://fr.ninemanga.com",
                                  18    "https://it.ninemanga.com",
                                   5    "https://mangajar.com/manga",
                                   8    "https://mangajar.com",
                              *    6    "https://mangakomi.io/",
                              *    2    "https://mangareader.cc",   
                                   7    "https://readm.org/",   
                                   1    "https://ww5.manganelo.tv",
                                   0    "https://www.mangainn.net",
                                        
    */}
      
          <Link to="/novel" onClick={()=>dispatch(changeServer(4))}> {/* redirect to server novel : bestlightnovel.com*/}
            <p className="novel">Novel</p>
          </Link>
          <Link to="/contact-us">
            <p className="contact">Contact us</p>
          </Link>
          <Link to="/policy">
            <p className="policy">Policy</p>
          </Link>
          <Link
            to={`https://apps.apple.com/us/app/manga-reader-mangakomi-online/id6446646720`}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
              alt=""
              className="w-5 h-5 lg:w-12 lg:h-12 hover:scale-105 transition-all cursor-pointer"
            />
          </Link>
        </div>
        <div className="avatar_search">
          <CiSearch
            color="red"
            size={32}
            onClick={handleSearch}
            className="mr-2 cursor-pointer"
          />
          <input
            className="w-full border-none outline-none bg-transparent opacity-100"
            placeholder="Search..."
            name="content"
            onChange={handleOnChange}
            onKeyDown={handleSearch}
          />
          {!isLogin ? (
            <div className="flex justify-center align-middle items-center ml-4">
              <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Login
                </button>
              </Link>
            </div>
          ) : (
            // <Link to="/user-profile">
            //     <div className="avatar">
            //         <img src="/images/usersquare.svg" alt="usersquare"></img>
            //     </div>
            // </Link>
            <SubMenu />
          )}
          {/*  */}
          {checkSearch ? (
            <div className="h-80 w-[17rem] bg-[#DADADA] absolute mt-[375px] ml-[50px] rounded-lg border-double flex justify-center flex-col items-center overflow-y-auto ">
              <hr className="mt-[150px]" />  
              {searchData ? (
                searchData.slice(0,3).map((item,index)=>(
                  <div className="w-[90%] h-full border-double border-red-900 rounded-lg flex border-4 cursor-pointer  ">
                  <img
                    className="w-1/3 h-[69%] py-2 rounded-lg"
                    src={item.poster}
                    alt=""
                  />
                  <Link
                    to={`/chapter/` + arr_path[index]}
                    onClick={() => (window.location.href = "/chapter/" + arr_path[index])}
                    className="flex"
                  >
                    <div className="text-lg flex flex-col ml-6 justify-center">
                      <div>{item.title}</div>
                      <div>Rate:{item.rate}</div>
                      <div>Views: {item.views}</div>
                    </div>
                  </Link>
                </div>
                ))
              ) : (
                <p>Not found @@</p>
              )}

              <div className="text-white border-5 border-white bg-blue-400 rounded-lg h-6 w-24 flex text-center content-center justify-center my-2">
                <button onClick={() => handleCloseSearch()}>Close</button>
              </div>
            </div>
          ) :
          null
          }
        </div>
      </div>
      <Outlet></Outlet>

      {isModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="z-10 p-8 text-center bg-white rounded-md">
            <h2 className="mb-4 text-2xl font-bold">Dowload App</h2>
            <Link to={link}>
              <img src={modalContent} alt="ios" style={{ width: "200px" }} />
            </Link>
            <button
              onClick={closeModal}
              className="px-4 py-2 mt-4 text-white bg-red-500 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

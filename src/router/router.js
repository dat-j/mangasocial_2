import Layout from "../pages/layout";
import Index from "../pages";

import Page_comic from "../pages/comic/comic";

import Page_Genres from "../pages/Genres/Genres";
import Page_chapper from "../pages/Chapper/chapper";
import { createBrowserRouter } from "react-router-dom";
import UserProfile from "../pages/UserProfile";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login/Login.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import Page_NewRelease from "../pages/NewRelease/NewRelease";
import Page_Recent from "../pages/Recent/Recent";
import Page_Comming from "../pages/Comming/Comming";
import ChapterPage from "../pages/ChapterPage/ChapterPage";
import ReadChapter from "../pages/ReadChapter/ReadChapter";
import Test from "../pages/Test/Test.jsx";
import MangaCategory from "../pages/MangaCategory/MangaCategory.jsx";
import ItemManga from "../components/MangaItem/ItemManga.jsx";
import ViewCategory from "../pages/ViewCategory/ViewCategory.jsx";
import Policy from "../pages/Policy/Policy.jsx";
import MangaText from "../pages/MangaText/MangaText.jsx";
import React from "react";
import Page_Recommended from "../pages/Recommended/Recommended.js";
import ViewUserProfile from "../pages/profile/index.js";
import Novel from "../pages/Novel/Novel.js";
import NovelPage from "../pages/Novel/NovelPage.js";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index/>,
      },
      {
        path: "/comic",
        element: <Page_comic  />,
      },
      {
        path: "/genres",
        element: <Page_Genres  />,
      },
      {
        path: "/chapper",
        element: <Page_chapper />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/novel",
        element: <Novel />,
      },
      {
        path: "/policy",
        element: <Policy />,
      },
      {
        path: "/user-profile",
        element: <UserProfile  />,
      },
      {
        path: "/view-user-profile",
        element: <ViewUserProfile  />,
      },
      {
        path: "newRelease",
        element: <Page_NewRelease  />,
      },
      {
        path: "recent",
        element: <Page_Recent  />,
      },
      {
        path: "recommended",
        element: <Page_Recommended  />,
      },
      {
        path: "commingsoon",
        element: <Page_Comming  />,
      },
      {
        path: "chapter/:slug",
        element: <ChapterPage />,
      },
      {
        path: "chapter/:slug/:id",
        element: <ReadChapter />,
      },
      {
        path: "novel/:slug",
        element: <NovelPage />,
      },
      {
        path: "genres/:category",
        element: <MangaCategory  />,
      },
      {
        path: "/all-category",
        element: <ViewCategory/>,
      },
      {
        path: "/manga-text",
        element: <MangaText />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/test",
    element: <ItemManga />,
  },
]);
export default router;

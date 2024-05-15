import React from "react";
import CardManga from "./cardManga";
import useFetch from "../hooks/useFetch";

const ComicRecent = () => {
    const comicRecent = useFetch(1);
    console.log(comicRecent)
    const firstFiveItem = comicRecent.slice(0, 20);
    return (
        <div className="grid md:grid-cols-5 2xl:grid-cols-10 gap-[20px] px-[60px] pb-[60px]">
            {firstFiveItem.map((item, index) => (
                <CardManga
                    key={index}
                    poster={item?.image_poster_link_goc}
                    title={item?.title_manga}
                    rate={item?.rate}
                    update={item.time_release}
                    chapter={item?.chapter_new}
                    path_segment={item?.path_segment_manga}

                />
            ))}
        </div>
    );
};

export default ComicRecent;

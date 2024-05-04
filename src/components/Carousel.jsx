import React from "react";
import { Link } from "react-router-dom";
import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import play from "../assets/play.png";


function Carousel({ animeData }) {

    return <>
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(animeData)}
            onSlideChange={() => console.log('slide change')}
        >


            {animeData.map((anime, ind) => {
                return (
                    <SwiperSlide key={ind}>
                        <div>
                            <div
                                className="bannerimg w-full h-96 bg-cover bg-center border-2 border-gray-800 rounded-lg shadow-lg"
                                style={{ backgroundImage: `url(${anime.cover})` }}
                            >
                                <div className="bannercontent w-full h-full  bg-black bg-opacity-10 rounded-lg">
                                    <div className=" bg-gradient-to-b from-black to-transparent bg-opacity-30 p-4 flex flex-col items-end h-full justify-between">
                                        <div className="mb-2 w-1/2 flex justify-end text-center">
                                            {/* <div className="w-1/2"> */}
                                            <h1 className="text-blue-50 text-xl font-bold sm:text-1xl md:text-2xl lg:text-3xl ">{anime.title.english || anime.title.romaji}</h1>
                                            {/* </div> */}
                                        </div>
                                        <div>
                                           
                                            <Link
                                                to={`/anime/info/${anime.id}/${anime.title.english || anime.title.romaji}`}
                                            >
                                                <button className="bg-no-repeat bg-center bg-contain h-20 w-20 hover:h-24 hover:w-24 hover:bg-no-repeat hover:bg-center hover:bg-contain hover:bg-opacity-50 hover:rounded-lg"
                                                    style={{ backgroundImage: `url(${play})` }}
                                                >


                                                </button>
                                            </Link>

                                        </div>

                                    </div>


                                </div>
                            </div>


                        </div>
                    </SwiperSlide>


                );
            })}




        </Swiper >

    </>


}

export default Carousel;

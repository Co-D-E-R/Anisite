import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/free-mode';
import { useDraggable } from "react-use-draggable-scroll";
import { FreeMode } from 'swiper/modules';
import '../styles/AnimeCard.css';


function AnimeCard({ url }) {
    const [data, setData] = useState([]);
    const [Loading, setLoading] = useState(true);


    // const containerRef = useRef();
    // const { events }= useDraggable(containerRef);

    const getAnime = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_URL}/meta/anilist/${url}`, {
                params: {
                    page: 1,
                    PerPage: 20,
                },
            });
        
            console.log(res.data.results);
            setData(res.data.results);
            setLoading(false);
        } catch (error) {
            console.error("Error finding the anime data", error);
            if(error.response && error.response.status === 504){
                localStorage.setItem("notfound",url);
            }
            setLoading(false);
        }
    };
    useEffect(() => {
        getAnime();
    }, []);
    // if(Loading){
    //     return <div className="" {...events} ref={containerRef}>Loading...</div>
    // }

    return !Loading ? (
        <div className="flex flex-row p-1">
            <div className="flex items-center relative overflow-hidden scroll-smooth ">
                <Swiper slidesPerView="auto" grabCursor freeMode={{ enabled: true, momentum: true, momentumRatio: 0.8 }} modules={[FreeMode]}>
                    {data.map((anime) => (
                        <SwiperSlide key={anime.id} className='animecarditem flex-col overflow-scroll  p-1 mr-3 rounded-md w-44 h-75' >
                            <Link to={`/anime/info/${anime.id}/${anime.title.romaji}`}>
                                <img src={anime.image} alt={anime.image.title} loading='lazy' className=" cardimage w-44 h-64 object-cover rounded-md" />
                            </Link>
                            <div className=" flex items-center relative overflow-hidden scroll-smooth">
                                <p className='animetitle overflow-hidden text-ellipsis
                                            text-yellow-20 text-center text-sm mx-0.5 w-full'>
                                    {anime.title.english ? anime.title.english : anime.title.romaji}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    ) : null;
}

export default AnimeCard;


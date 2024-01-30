import WindowDimension from '../Utils/WindowDimension';
import axios from "axios";
import React, { useContext, useEffect, useState,useRef } from "react";
import { DataContext } from "../context/DataContext";
import img from "../assets/notFound.jpg";
import { useParams, Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";


function AnimeDetail() {
    const { id, title } = useParams();
    const { fetchAnimeEpisode, fetchAnime ,fetchNewEpisode } = useContext(DataContext);
    const [anime, setAnime] = useState([]);
    const [episode, setEpisode] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [epLoading, setEpLoading] = useState(true);
    const [newEpLoading, setNewEpLoading] = useState(true);
    const { widtth } = WindowDimension();
    const [localStorageDetail, setLocalStorageDetail] = useState(0);
    const [newEpisode, setNewEpisode] = useState([]);
    const subtype = "sub";
    const newid= useRef(null);


    const getData = async () => {
        window.scrollTo(0, 0); //Scroll to Top when page is loaded again
        setLoading(true);
        try {
            const getAnime = await fetchAnime(id);
            setAnime(getAnime);
            // console.log("anime ::" ,getAnime);
            getLocalStorage(getData);
        } catch (error) {
            if (error.response && error.response.status === 504 || error.response.status === 500) {
                console.log("Gateway Timeout");
            } else {
                console.error("Error finding the anime data", error);
            }
        } finally {
            setLoading(false);
        }
    }
    //gogoanime server
    const getnewEpisode = async () => {
        setNewEpLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_URL}/anime/gogoanime/${title}`);
            if(res.data.results && res.data.results[0]){
                newid.current =res.data.results[0].id
            }
            // const res1  = await axios.get(`${import.meta.env.VITE_URL}/anime/gogoanime/info/${newid.current}`);
            // if(res1.data.episodes && res1.data.episodes.length > 0){
            //     setNewEpisode(res1.data.episodes);
            // }
            const getNewEpisodes = await fetchNewEpisode(newid.current);
            setNewEpisode(getNewEpisodes.episodes);
                
        }catch(error){
            console.log(error , "Error finding the new anime data");
        }finally{
            setNewEpLoading(false);
        }

    }
  






    // const res = await axios.get(`https://api.anify.tv/episodes/${id}`);
    const getEpisode = async () => {
        setEpLoading(true);
        try {
            const getEpisodes = await fetchAnimeEpisode(id);
            const animeProvider = getEpisodes.find((i) => i.providerId === 'gogoanime');//If it founds the gogoanime provider then it will return the episode

            if (animeProvider) {
                setEpisode(animeProvider);
            } else {
                setEpisode(getEpisodes[0]);
            }
        } catch (error) {
            console.error("Error finding the anime episode", error);
        } finally {
            setEpLoading(false);
        };
    }
    useEffect(() => {
        getData();
        getEpisode();
        getnewEpisode();
    }, [id]);

    function getLocalStorage(anime) {
        if (localStorage.getItem('anime')) {
            const cacheData = JSON.parse(localStorage.getItem('anime'));

            let index = cacheData.Names.findIndex(
                (ind) => ind.name === anime.title.english
            );
            if (index !== -1) {
                setLocalStrorageDetail(cacheData.Names[index].currentEpisode);
            }

        }
    }
   

    return (
        <>
            <div>
                {!Loading && anime && (
                    <div>
                        <img src={anime.cover ? anime.cover : img
                        } alt={anime.title.english} className="w-full h-96 object-cover rounded-xl sm:h-60 sm:rounded-2xl sm:w-[85%] sm:mx-auto" />
                        <div className='flex p-0 px-12 relative'>
                            <div className='flex flex-col' >
                                <div className='pic'>
                                <img src={anime.image || anime.coverImage} alt="image" className="w-56 h-75 rounded-lg mb-8 relative -top-20 shadow-lg transform hover:scale-110 transition-transform duration-200 " />
                                {epLoading && (
                                    <div>
                                        <Skeleton
                                            height={"50px"} width={"100%"} baseColor={"#d67e83"} highlightColor={"#e8bcb8"} />
                                    </div>
                                )}
                                </div>
                                <div>
                                    <h1 className='font-semibold text-2xl text-white mt-4 mb-2'>{anime.title.english || anime.title.romaji}</h1>
                                </div>
                            </div>

                            <div>
                                <div>
                                    {!newEpLoading && (
                                        <>
                                            {localStorageDetail !== 0 && newEpisode && newEpisode?.length > 0 ? (
                                                <Link to={`/anime/${newEpisode[0].id}`}>
                                                    EP-{localStorageDetail}
                                                </Link>
                                            ) : (
                                                newEpisode && (
                                                    <Link to={`/anime/${newid.current}/gogoanime/${encodeURIComponent(newEpisode[0].id)}/${newEpisode[0].number}`}>
                                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" >New Server</button>
                                                    </Link>
                                                )
                                            )}
                                        
                                        </>
                                    )}
                                </div>
                                <div>
                                    {!epLoading && (
                                        <>
                                            {localStorageDetail !== 0 && episode?.episodes && episode?.episodes.length > 0 ? (
                                                <Link to={`/anime/${episode.episodes[0].id}`}>
                                                    EP-{localStorageDetail}
                                                </Link>
                                            ) : (
                                                episode?.episodes && (
                                                    <Link to={`/anime/${id}/${episode.providerId}/${encodeURIComponent(episode.episodes[0].id)}/${episode.episodes[0].number}/${subtype}`}>
                                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Watch Now</button>
                                                    </Link>
                                                )
                                            )}

                                        </>
                                    )}
                                </div>

                                <p>
                                    <span>Type:</span>
                                    {anime.fomat || anime.type}
                                </p>
                                <p>
                                    <span>Total Episode:</span>
                                    {anime.totalEpisodes}
                                </p>
                                <p>
                                    <span>Episodes:</span>
                                    {anime.currentEpisode}
                                </p>
                                <p>
                                    <span>Duration:</span>
                                    {anime.duration}min
                                </p>
                                <p>
                                    <span>Status:</span>
                                    {anime.status}
                                </p>
                                <p>
                                    <span>Genres:</span>
                                    {anime.genres.join(", ")}
                                </p>
                                <p>
                                    <span>Rating:</span>
                                    {anime.rating}
                                </p>
                                <p>
                                    <span>Description:</span>
                                    {anime.description}

                                </p>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        </>

    )
}

export default AnimeDetail;
import WindowDimension from '../Utils/WindowDimension';
import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { DataContext } from "../context/DataContext";
import img from "../assets/notFound.jpg";
import { useParams, Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import Skeleton from "react-loading-skeleton";


function AnimeDetail() {
    const { id, title } = useParams();
    const { fetchAnimeEpisode, fetchAnime, fetchNewEpisode } = useContext(DataContext);
    const [anime, setAnime] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [episode, setEpisode] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [epLoading, setEpLoading] = useState(true);
    const [newEpLoading, setNewEpLoading] = useState(true);
    const [newEp, setNewEp] = useState(true);
    const { widtth } = WindowDimension();
    const [localStorageDetail, setLocalStorageDetail] = useState(0);
    const [newEpisode, setNewEpisode] = useState([]);
    const subtype = "sub";
    const newid = useRef(null);
   


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
            const res = await axios.get(`${import.meta.env.VITE_URL}/meta/anilist/info/${id}`,{
                params:{
                    type:"gogoanime"
                }
            });
            console.log("res", res.data);
            
            if (res.data?.episodes && res.data?.episodes[0]) {
                newid.current = res.data?.episodes[0].id
            }
            // const res1  = await axios.get(`${import.meta.env.VITE_URL}/anime/gogoanime/info/${newid.current}`);
            // if(res1.data.episodes && res1.data.episodes.length > 0){
            //     setNewEpisode(res1.data.episodes);
            // }
            if (newid.current) {
                const getNewEpisodes = await fetchNewEpisode(id);
                setNewEpisode(getNewEpisodes?.episodes);

                // console.log("newEpisodes", getNewEpisodes);
                // if(getNewEpisodes){
                //     setNewEpisode(getNewEpisodes?.episodes);
                // }else{
                //     setNewEp(false);
                //     setNewEpisode(null);
                //     setNewEpLoading(true);
                // }
  
            } else {
                setNewEp(false);
            }

        } catch (error) {
            setNewEp(false);
            console.log(error, "Error finding the new anime data");
        } finally {
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
            setNewEp(false);
            console.error("Error finding the anime episode", error);
        } finally {
            setEpLoading(false);
        };
    }

    useEffect(() => {
        getData();
        getEpisode();
        if (newEp === true) {
            getnewEpisode();
        }


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
    //    if(newEpLoading){
    //     return <ClipLoader color="#ffffff" loading={newEpLoading} size={150} />;
    //    }

    return (
        <>
            <div>
                {!Loading && anime ? (
                    <div>
                        <img src={anime.cover ? anime.cover : img
                        } alt={anime.title.english} className="w-full h-96 object-cover rounded-xl sm:h-60 sm:rounded-2xl sm:w-[85%] sm:mx-auto" />
                        <div className='flex flex-col sm:flex-row p-0 pl-5 pr-12 '>
                            <div className='flex sm:flex-col sm:pl-14 sm:mr-12' >
                                {/* <div className=''> */}
                                <img src={anime.image || anime.coverImage} alt="image" className="w-56 h-75 rounded-lg relative -top-20 shadow-lg transform hover:scale-110 transition-transform duration-200 min-w-[200px]" />
                                {epLoading && (
                                    <div>
                                        <Skeleton
                                            height={"50px"} width={"100%"} baseColor={"#d67e83"} highlightColor={"#e8bcb8"} />
                                    </div>
                                )}


                            </div>


                            <div className='sm:mt-5'>
                                <div className=' relative -top-3 mb-2'>
                                    {!epLoading ? (
                                        <>
                                            {localStorageDetail !== 0 && episode?.episodes && episode?.episodes.length > 0 ? (
                                                <Link to={`/anime/${episode.episodes[0].id}`}>
                                                    EP-{localStorageDetail}
                                                </Link>
                                            ) : (
                                                episode?.episodes && (
                                                    <Link to={`/anime/${id}/${episode.providerId}/${encodeURIComponent(episode.episodes[0].id)}/${episode.episodes[0].number}/${subtype}`}>
                                                        <button className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Watch Now</button>
                                                    </Link>
                                                )
                                            )}

                                        </>
                                    ) : (
                                        <div>
                                            <BeatLoader color="#8A8AFF" loading={newEpLoading} size={20} margin={5} speedMultiplier={1} />
                                        </div>

                                    )}
                                </div>

                                <div>
                                    {!newEpLoading ? (
                                        <>
                                            {localStorageDetail !== 0 && newEpisode && newEpisode?.length > 0 ? (
                                                <Link to={`/anime/${newEpisode[0].id}`}>
                                                    EP-{localStorageDetail}
                                                </Link>
                                            ) : (
                                                newEpisode && (
                                                    // <Link to={`/anime/${newid?.current}/gogoanime/${encodeURIComponent(newEpisode[0]?.id)}/${newEpisode[0]?.number}`}>
                                                    //     <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" >New Server</button>
                                                    // </Link>
                                                    <Link to={`/anime/${id}/gogoanime/${encodeURIComponent(newEpisode[0]?.id)}/${newEpisode[0]?.number}`}>
                                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" >New Server</button>
                                                     </Link>
                                                )
                                            )}

                                        </>
                                    ) : (
                                        <div>
                                            {newEp ? (
                                                <BeatLoader color="#36d7b7" loading={newEpLoading} size={20} margin={5} speedMultiplier={1} />
                                            ) : (
                                                null
                                            )}
                                        </div>


                                    )}
                                </div>

                                <div>
                                    <h1 className='font-semibold text-2xl text-white my-5'>{anime.title.english || anime.title.romaji}</h1>
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
                                <div>
                                    <p>
                                        <span>Description:</span>
                                        {isExpanded ? anime.description : `${anime.description.substring(0, 200)}...`}
                                        <button className="text-blue-500" onClick={() => setIsExpanded(!isExpanded)}>
                                            {isExpanded ? "show less" : "read more"}
                                        </button>

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-screen">
                        <BeatLoader color="#36d7b7" loading={Loading} size={15} />
                    </div>
                )}
            </div >
        </>

    )
}

export default AnimeDetail;
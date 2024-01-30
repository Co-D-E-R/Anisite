import { createContext, useEffect, useState } from "react";
import axios from "axios";
const DataContext = createContext();

const GetData = ({ children }) => {
    const newData = localStorage.getItem("newEpData");
    const storeData = localStorage.getItem("storedata");
    const anifyEpisode = localStorage.getItem("anifyEpisodes");
    const [data, setData] = useState(newData ? JSON.parse(newData) : null);
    const [episode, setEpisode] = useState(anifyEpisode ? JSON.parse(anifyEpisode) : null);
    const [isopen, setisopen] = useState(false);
    const [anifybanner, setanifybanner] = useState("");
    const [animeData, setAnimeData] = useState(storeData ? JSON.parse(storeData) : null);
    const [player, setPlayer] = useState({
        currentTime: 0,
        isPlaying: false,
    });

    const setGlobalData = (newData) => {
        setAnimeData(newData);
    };
    const setGlobalNewEpisode = (newEpisodes) => {
        setData(newEpisodes);
    };

    const setGlobalEpisode = (newEpisode) => {
        setEpisode(newEpisode);
    };


    //fetching new anime data

    const fetchNewEpisode = async (newid) => {
        try {
            // const res = await axios.get(`${import.meta.env.VITE_URL}/anime/gogoanime/${title}`);
            // if(res.data.results && res.data.results[0]){
            //     newid.current =res.data.results[0].id
            // }

            const res1 = await axios.get(`${import.meta.env.VITE_URL}/anime/gogoanime/info/${newid}`);
            if (res1.status !== 200) {
                throw new Error(res1.status + " " + res1.statusText);
            }

            setGlobalNewEpisode(res1.data);
            // console.log("h1-->datacontext",res1.data);
            return res1.data;

        } catch (error) {
            console.log(error, "Error finding the new anime data");
            return null;
        }

    }
    // console.log(data);



    const fetchAnimeEpisode = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_ANI_URL}episodes/${id}`);
            if (response.status !== 200) {
                throw new Error(response.status + " " + response.statusText);
            }
            setGlobalEpisode(response.data);
            return response.data;
        } catch (error) {
            console.error("Error finding the anime episode", error);
            return null;
        }
    };


    const fetchAnime = async (id) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_URL}meta/anilist/info/${id}`,
                {
                    params: {
                        provider: 'animefox',
                    },
                }
                // `https://api.anify.tv/info/${id}?fields=[id,slug,coverImage,bannerImage,trailer,status,season,title,currentEpisode,countryOfOrigin,description,duration,year,type,format,totalEpisodes,genres,averageRating]`
            );
            setGlobalData(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching anime details:", error);
            return null; // or handle the error as needed
        }
    };


    useEffect(() => {
        localStorage.setItem("newEpData", JSON.stringify(data));
        localStorage.setItem("anifyEpisodes", JSON.stringify(episode));
        localStorage.setItem("storedata", JSON.stringify(animeData));

        const anifyImage = async (animeData) => {
            if (animeData && animeData.id) {
                const response = await axios.get(`${import.meta.env.VITE_ANI_URL}info/${animeData.id}?fields=[bannerImage]`);
                setanifybanner(response.animeData.bannerImage);
            }
        }
        anifyImage();
    }, [data, episode, animeData, fetchAnime, fetchAnimeEpisode, fetchNewEpisode]);

    return (
        <DataContext.Provider value={{
            data, setData, episode, setEpisode, animeData, setAnimeData, fetchAnime, fetchAnimeEpisode,
            fetchNewEpisode, anifybanner, setanifybanner, isopen, setisopen, player, setPlayer
        }}>
            {children}
        </DataContext.Provider>
    )


};

export { DataContext, GetData };


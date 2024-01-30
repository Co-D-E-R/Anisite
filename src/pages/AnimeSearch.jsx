import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import AllAnime from "../components/AllAnime";


function AnimeSearch() {
    const [anime, setAnime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(true);
    const [query, setQuery] = useState("");

    const getData = async () => {
        setLoading(false);
        try {
            const res = await axios.get(`${import.meta.env.VITE_URL}/meta/anilist/advanced-search`, { params: { query: query, sort: ["POPULARITY_DESC", "SCORE_DESC"],page:page } });

            if (page > 1 ) {
                setAnime((prev) => [...prev, ...res.data.results])
                setHasNext(res.data.hasNextPage);
            } else {
                setAnime(res.data.results);
                setHasNext(res.data.hasNextPage);
                console.log(res.data.results);
            }


        } catch (error) {
            console.error("Error finding the anime query", error);
            setLoading(false);
        } finally {
            setLoading(true);
        }
    }
    useEffect(() => {
        getData();
    }, [page, query]);

    const handlechange = (e) => {
        setQuery(e.target.value);
        setPage(1);

    }
    // useEffect(() => {
    //     window.onscroll = function (ev) {
    //         if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
    //             setPage((prev) => prev + 1);
    //         }
    //     };

    // }, [page, hasNext])
    useEffect(() => {
        const handleScroll = (ev) => {
            if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 3) {
                setPage((prev) => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (

        <div>
            <div className=" border-spacing-2 border-white outline-none text-black">
                <input type="text" placeholder="Search Anime" onChange={(e) => handlechange(e)} />
            </div>
            {/* {loading && 
            <> */}
            <div className="grid g)rid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-auto w-11/12 justify-center">
                {anime && anime.map((i) =>
                    <AllAnime key={i.id} anime={i} />
                )
                }
            </div>
            <div className="font-semibold justify-center text-xl">
                {!hasNext && <span>END OF THE PAGE</span>}
            </div>
            {/* </>
            }
            {!loading && <span>LOADING...</span>} */}

        </div>
    )
}
export default AnimeSearch;
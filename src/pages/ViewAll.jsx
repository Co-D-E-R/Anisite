import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AllAnime from "../components/AllAnime";

function ViewAll() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const { url } = useParams();





  const getData = async () => {
    setLoading(false);
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/meta/anilist/${url}`, {
        params: {
          page: page,
          perPage: 20,
        }
      });
      if (page > 1) {
        setAnime((prev) => [...prev, ...res.data.results]);
        setHasNext(res.data.hasNextPage);
      } else {
        setAnime(res.data.results);
        setHasNext(res.data.hasNextPage);

      }
      setLoading(false);
    } catch (error) {
      console.error("Error finding the anime data", error);
      setLoading(false);
    }

  };
  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    const handleScroll = (ev) => {
      if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 10 && hasNext) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
   

  }, [page, hasNext])



  return <>
    <h1 className="font-semibold pl-7 my-4 text-center text-blue-500 text-xl">{url.toUpperCase()} ANIME</h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mx-auto w-11/12 justify-center">
      {anime.map((i, index) =>
        <AllAnime key={index} anime={i} />
      )
      }
    </div>
    <div className="font-semibold justify-center text-xl">
      {!hasNext && <span>END OF THE PAGE</span>}
    </div>
  </>


}

export default ViewAll;
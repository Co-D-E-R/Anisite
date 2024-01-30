import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect,useRef } from "react";
import { useParams } from "react-router-dom";
import AllAnime from "../components/AllAnime";

function ViewAll() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const { url } = useParams();

  const containerRef = useRef();



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
        // console.log(res.data);
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

  useEffect(() =>{
    window.onscroll = function(ev) {
      if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
          setPage((prev) => prev + 1); 
      }
  };

  },[page,hasNext])



  return <>
     <h1 className="font-semibold pl-7 py-2 b text-xl">{url.toUpperCase()}</h1>
    <div className="grid g)rid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-auto w-11/12 justify-center">
      {anime.map((i) => 
        <AllAnime key={i.id} anime={i} />
      )
      }
    </div>
    <div className="font-semibold justify-center text-xl">
      {!hasNext && <span>END OF THE PAGE</span>}
    </div>
  </>


}

export default ViewAll;
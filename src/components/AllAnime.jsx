import React from "react";
import { Link } from 'react-router-dom';

function AllAnime({anime}){
    return(
    <>
        <div key={anime.id} className="transform hover:scale-105 transition-transform duration-200 mb-10">
            <Link to={`/anime/info/${anime.id}/${anime.title.romaji}`}>
                <img className="rounded-3xl min-h-full min-w-full" src={anime.image} alt={anime.title.english} />
            </Link>
            <div className="text-center h-5">
                <p>{anime.title.english ? anime.title.english:anime.title.romaji}</p>
            </div>
        </div>
    </>
        
    )
}

export default AllAnime;
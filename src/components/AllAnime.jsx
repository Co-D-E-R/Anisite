import React from "react";
import { Link } from 'react-router-dom';

function AllAnime({anime}){
    return(
    <>
        <div key={anime.id} className="flex flex-col transform hover:scale-110 transition-transform duration-200">
            <Link to={`/anime/info/${anime.id}/${anime.title.romaji}`}>
                <img className="rounded-3xl h-55 object-cover " src={anime.image} alt={anime.title.english} />
            </Link>
            <div className="text-center ">
                <p>{anime.title.english ? anime.title.english:anime.title.romaji}</p>
            </div>
        </div>
    </>
        
    )
}

export default AllAnime;
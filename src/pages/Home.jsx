import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Animecard from '../components/AnimeCard';
import '../styles/Home.css';

export default function Home() {
    const sections =[
        {
            title:"Popular Anime",
            url:"popular",
            condition: localStorage.getItem("notfound") === "popular" ? true : false
        },
        {
            title:"Recently Update",
            url:"recent-episodes",
            condition: localStorage.getItem("notfound") === "recent-episodes" ? true : false
        },
        {
            title:"Trending Anime",
            url:"trending",
            condition: localStorage.getItem("notfound") === "trending" ? true : false
        },
    ]
    
    return <>
    <div className="home">
    {sections.map((section, index) => !section.condition && (
      <div key={index} className="homecontainer">
        <div className="hometitle relative">
          <h3 className='font-medium text-red-900 text-xl'>{section.title}</h3>
          <Link to={`/anime/all/${section.url}`} className="absolute right-0 top-0">
              <button className="bg-red-800 px-1 py-1 hover:bg-red-950 rounded-md">View All</button>
            </Link>
          <div>
            <Animecard url={section.url}/>
          </div>
        </div>
      </div>
    ))}
  </div>

    
   </>

}
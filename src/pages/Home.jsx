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
            title:"Trending Anime",
            url:"trending",
            condition: localStorage.getItem("notfound") === "trending" ? true : false
        },
        {
           title:"Recently Added",
            url:"recent-episodes",
            condition: localStorage.getItem("notfound") === "recent-episodes" ? true : false
        }
    ]
    
    return <>
    <div className="my-3">
    {sections.map((section, index) => !section.condition && (
      <div key={index} className="homecontainer">
        <div className="hometitle relative">
          <div className='my-1'>
          <h3 className='font-medium text-custom-blue text-xl'>{section.title}</h3>
          <Link to={`/anime/all/${section.url}`} className="absolute right-0 top-0">
              <button className="bg-custom-blue px-2 text-blue-100 font-medium py-1 hover:bg-blue-900 rounded-md">View All</button>
            </Link>
          </div>
          <div>
            <Animecard url={section.url}/>
          </div>
        </div>
      </div>
    ))}
  </div>

    
   </>

}
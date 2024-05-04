import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Animecard from '../components/AnimeCard';
import Carousel from '../components/Carousel';
import '../styles/Home.css';

export default function Home() {

    const [data, setData] = useState([]);
    const [Loading, setLoading] = useState(true);
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
    const anime = async()=>{
     
      try{
        const res= await axios.get(`${import.meta.env.VITE_URL}/meta/anilist/trending`);
        setData(res.data.results);
        if (res.data && res.data.results) {
          const data = res.data.results;
          setData(data);
        } else {
          console.error("Invalid response: ", res.data);
        }
        setLoading(false);
    
      }catch(error){
        console.error("Error finding carousel data", error);
        setLoading(false);
      }
    }
   

    useEffect(()=>{
      anime();
    },[]);

    
    return <>
    <div className='flex carousel h-96 w-full justify-center  mt-4'>
      {!Loading && <Carousel animeData={data}/>}
    </div>
    <div className="my-3">
    {sections.map((section, index) => !section.condition && (
          <div key={index} className="homecontainer border-2 border-gray-800 rounded-lg shadow-lg">
        <div className="hometitle relative">
          <div className='my-1'>
          <h3 className='font-medium text-custom-blue text-2xl text-center'>{section.title}</h3>
          <Link to={`/anime/all/${section.url}`} className="absolute right-0 top-0">
              <button className="bg-custom-blue px-2 text-blue-100 font-medium py-1 hover:bg-blue-900 rounded-md">View All</button>
            </Link>
          </div>
          <div className='my-2'>
            <Animecard url={section.url}/>
          </div>
        </div>
      </div>
    ))}
  </div>

    
   </>

}
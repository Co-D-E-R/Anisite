import React,{useContext,useEffect,useState} from "react";
import {DataContext} from "../context/DataContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PlayerComponent from "../artPlayer/PlayerComponent";

function AnimePlayer(){
    const { id,epid,epnum,provider,subtype } = useParams();
    const { episode,fetchAnimeEpisode,animeData,fetchAnimeDetails } = useContext(DataContext);
    const nagivate = useNavigate();
    const [Loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [nextEp,setNextEp] = useState(null);

    const currentProvider = episode.find((i) => i.providerId === provider)
    const currentEpIndex = currentProvider.episodes.findIndex((i) => i.number === parseInt(epnum,10));
    useEffect(()=>{
        const getData = async () =>{
            try{
                setLoading(true);
                if(id !== animeData?.id){
                    await fetchAnimeDetails(id);
                    await fetchAnimeEpisode(id);
                }
                setLoading(false);
            }catch(error){
                setError(error.message ||"Error finding the anime data");
                setLoading(false);   
            }
        };
        getData();
        const nextEpIndex = currentEpIndex +1;
        if(nextEpIndex < currentProvider.episodes.length){
            const nextEpNumber = currentProvider.episodes[nextEpIndex].number;
            const nextEpid = currentProvider.episodes[nextEpIndex].id;
            setNextEp({
            nextEpNumber:nextEpNumber,
            nextEpid:nextEpid,
        
            })
        }else{
            setNextEp({
                nextEpNumber:null,
                nextEpid:null,
            })
        }
    
    },[id,animeData,fetchAnimeDetails,fetchAnimeEpisode,epnum,epid,episode]);
    // console.log(epid);
    // console.log(currentProvider.episodes)
    return(
        <div>
           <div className="w-full py-3  md:w-3/4 sm:pl-3 ">
                <div className="pb-4">
                    <PlayerComponent epid={epid} epnum={epnum} provider={provider} subtype={subtype} nextEp={nextEp} eptitle={currentProvider.episodes[currentEpIndex].title} server="1" />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold text-yellow-20">{animeData?.title.english ? animeData?.title.english : animeData?.title.romaji}</h1>
                    <p className="text-yellow-20">{currentProvider.episodes[currentEpIndex].title}</p>
                </div>
                <div className="inline-flex flex-wrap gap-2 border border-gray-700 p-2 bg-stone-950 ">
                    {currentProvider.episodes.map((i) => (
                        <button key={i.id} className={`rounded-md px-2 py-1 ${i.number === parseInt(epnum,10) ? "bg-blue-900 text-white":"bg-red-700 text-white"}`} onClick={() => nagivate(`/anime/${id}/${provider}/${encodeURIComponent(i.id)}/${i.number}/${subtype}`)}>{i.number}</button>
                    ))}
                </div>
           </div>
        </div>
    )
}
export default AnimePlayer;
import React,{useContext,useEffect,useState} from "react";
import {DataContext} from "../context/DataContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PlayerComponent from "../artPlayer/PlayerComponent";

function NewAnimePlayer(){
    const { id,epid,epnum} = useParams();
    const {animeData, data,fetchNewEpisode } = useContext(DataContext);
    const nagivate = useNavigate();
    const [Loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [nextEp,setNextEp] = useState(null);

    const provider = "gogoanime";
    const subtype = "sub";
    

    const currentEpIndex = data?.episodes.find((i) => i.number === parseInt(epnum,10));
    useEffect(() =>{
        const getData = async () =>{
            try{
                setLoading(true);
                if(id !== data?.id){
                    await fetchNewEpisode(id);
                }
                setLoading(false);
            }catch(error){
                setError(error.message ||"Error finding the anime data");
                setLoading(false);   
            }
        
        };
        getData();
        const nextEpIndex = currentEpIndex +1;
        if(nextEpIndex < data.episodes.length){
            const nextEpNumber = data.episodes[nextEpIndex].number;
            const nextEpid = data.episodes[nextEpIndex].id;
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
    },[id,data,fetchNewEpisode,epnum,epid]);
   
    return(
        <div>
           <div className="w-full py-3  md:w-3/4 sm:pl-3 ">
                <div className="pb-4">
                    <PlayerComponent epid={epid} epnum={epnum} provider={provider} subtype={subtype} nextEp={nextEp} eptitle={data.title}  server="2" />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold text-yellow-20">{animeData?.title.english ? animeData?.title.english : animeData?.title.romaji}</h1>
                    <p className="text-yellow-20">Episode {epnum}</p>
                </div>
                <div className="inline-flex flex-wrap gap-2 border border-gray-700 p-2 bg-stone-950 ">
                    {data.episodes.map((i) => (
                        <button key={i.id} className={`rounded-md px-2 py-1 ${i.number === parseInt(epnum,10) ? "bg-blue-900 text-white":"bg-red-700 text-white"}`} onClick={() => nagivate(`/anime/${id}/gogoanime/${encodeURIComponent(i.id)}/${i.number}`)}>{i.number}</button>
                    ))}
                </div>
           </div>
        </div>
    )
}

export default NewAnimePlayer;
import React, { useState, useEffect } from 'react';
const ANIME_URL = "https://api.anify.tv/stats"

export default function getAnimeData() {

    const [animeData, setAnimeData] = useState([]);

    useEffect(() => {
        getAnime();

    }, []);
    async function getAnime() {
        try {
            const response = await fetch(ANIME_URL);
            if (!response.ok) {
                throw new Error(response.status + " " + response.statusText);
            }
            const data = await response.json();
            setAnimeData(data);
        }
        catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <>
            <h1>Get Anime Data</h1>

            <button onClick={getAnime}>Get Anime Data</button>
            <h2>anime : {animeData.anime}</h2>
            <h2>manga : {animeData.manga}</h2>
            <h2>novels: {animeData.novels}</h2>
        </>
    )
}
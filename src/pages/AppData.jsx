import React from 'react';
import { Link } from 'react-router-dom';
export default function AppData() {

    return (
        <>
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className='text-blue-800 text-center text-4xl font-bold mb-10'>Watch Anime with no Ads</h1>
            <button className="border-spacing-2 bg-blue-700 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded">
                <Link to="/anime"> Watch Now </Link>
            </button>
        </div>
    </>
       
    )
}
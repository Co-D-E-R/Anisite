import React, { useContext, useEffect } from 'react';
// import '../styles/Navbar.css';
import SearchApp from './SearchApp';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { isopen, setisopen } = useContext(DataContext);
  const Navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyS' && e.ctrlKey) {
        e.preventDefault();
        setisopen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setisopen]);

  return (
    <div className="flex bg-black  bg-opacity-30 h-12 fixe w-full z-1000 backdrop-blur align-middle 
             md:justify-between md:align-middle md:h-12 md:bg-black md:bg-opacity-40">
      <div className="navbar-left">
        <div className="navbar-logo text-white decoration-none pl-2 text-xl">
          <Link className="link" to={`/`}>
            <span className="text-blue-800 text-5xl">A</span>nime
          </Link>
        </div>
      </div>
      <div className="m-auto w-10/12 flex justify-end  md:w-11/12 md:flex md:justify-end">
        <div>
          <input type="text" onClick={() => setisopen(true)} className="border-2 border-gray-300 p-1 w-full text-white rounded-xl mr-5 bg-black" placeholder="/Search" />
        </div>
        <button onClick={() => Navigate(`/anime/search`)} className="bg-transparent border-0 cursor-pointer ml-5 ">

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M6 10v2a4 4 0 004 4h2a4 4 0 004-4v-2a4 4 0 00-4-4h-2a4 4 0 00-4 4z" />
          </svg>

        </button>
        {isopen && <SearchApp />}
      </div>
    </div>
  );
}

export default Navbar;

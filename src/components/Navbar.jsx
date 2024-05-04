import React, { useContext, useEffect } from 'react';
import SearchApp from './SearchApp';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';



function Navbar() {
  const { isopen, setisopen } = useContext(DataContext);
 

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
    <div style={{ width: '95%' }}  className="flex content-center bg-black  bg-opacity-30 h-12 fixe  z-1000 backdrop-blur align-middle 
             md:justify-between md:align-middle md:h-12 md:bg-black md:bg-opacity-40">
      <div className="navbar-left">
        <div className=" text-white text-center decoration-none pl-2 text-3xl">
          <Link className="link" to={`/`}>
            <span className="text-custom-blue text-5xl">A</span>nime
          </Link>
        </div>
      </div>
      <div className="m-auto w-10/12 flex justify-end  md:w-11/12 md:flex md:justify-end">
        <div>
          <input type="text" onClick={() => setisopen(true)} className="border-2 border-gray-300 p-1 w-full text-white rounded-xl mr-5 bg-black" placeholder="/Search" />
        </div>
        {isopen && <SearchApp />}
      </div>
    </div>
  );
}

export default Navbar;

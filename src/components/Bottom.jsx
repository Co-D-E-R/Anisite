import React from 'react';
import github from '../assets/github.png';
// import linkedin from '../assets/linkedin.png';
import twitter from '../assets/twitter.png';
import reddit from '../assets/social.png';
import  telegram from '../assets/telegram.png'; 

function Bottom() {


    return <>
       <div className='bottom-0 w-full'>
        <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 bg-gradient-to-b from-black to-bg-gray-800 bg-opacity-10 ">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Created By @Verma.
            </span>

            <ul className="flex flex-wrap items-center mt-3 sm:mt-0">
                {/* <img src={github} alt="" className='h-10 w-10' /> */}
                <li>
                    <a href="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">About</a>
                </li>
                <li>
                    <a href="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Licensing</a>
                </li>
                <li>
                    <a href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">Contact</a>
                </li>
            </ul>
        </footer>
        </div>
     

    </>

}
export default Bottom;
import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { GetData} from "./context/DataContext";
import AppData from "./pages/AppData"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ViewAll from "./pages/ViewAll";
import AnimeDetail from "./pages/AnimeDetail";
import AnimePlayer from './pages/AnimePlayer';
import AnimeSearch from './pages/AnimeSearch';
import NewAnimePlayer from './pages/NewAnimePlayer';

function App() {
  return (
    <>
    <GetData>
    <Router>
      <Navbar/>
      <div className="allcomponents">
      <Routes>
        <Route path="/" exact element={<AppData />} />
        <Route path="/anime/info/:id/:title" exact element={<AnimeDetail />}/>
        <Route path="/anime/search" exact element={<AnimeSearch/>} />
        <Route path="/anime/:id/gogoanime/:epid/:epnum" element={<NewAnimePlayer/>} />
        <Route path="/anime/:id/:provider/:epid/:epnum/:subtype" element={<AnimePlayer/>} /> 
        <Route path="/anime" exact element={<Home />}/>
        <Route path="/anime/all/:url" exact element={<ViewAll />}/>

     
      </Routes>
      </div>
    </Router>
    </GetData>
      
    </>
  )
}

export default App

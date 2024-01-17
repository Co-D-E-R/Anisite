import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Apidata from "./pages/Apidata";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Apidata />} />
      </Routes>
    </Router>
    
  );
}

export default App

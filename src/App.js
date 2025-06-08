import React from 'react';
import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import Detail from './components/Detail'
import Login from './components/Login';
import SearchBar from './components/SearchBar';
import DisneyOriginals from './components/DisneyOriginals';
import DisneyMovies from './components/DisneyMovies';
import DisneyShows from './components/DisneyShows';
import Watchlist from './components/Watchlist';


import {BrowserRouter as Router,
Routes, 
Route,
}
from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>            
          <Route path="/" element={<Home/>}/>
          <Route path = "/login" element={<Login/>}/>
          <Route path ="/detail/:id" element={<Detail/>}/>
          <Route path='/original' element={<DisneyOriginals/>}/>
          <Route path='/movies' element={<DisneyMovies/>}/>
          <Route path='/series' element={<DisneyShows/>}/>
          <Route path='/search' element={<SearchBar/>}/>
          <Route path='/watchlist' element={<Watchlist/>}/>
        </Routes>
        </Router>
    </div>
  );
}

export default App;

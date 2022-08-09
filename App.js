import { Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
//components
import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from './components/Header';
import Footer from './components/Footer';
import Detalle from './components/Detalle';
import Resultados from './components/Resultados';
import Favoritos from './components/Favoritos';

//style
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/app.css"
function App() {
  const [favorites,setFavorites] = useState([]);
  useEffect (()=>{
    const favsInLocal = localStorage.getItem('favs')
    if(favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray);
    }
  },[])
  

  
  const addOrRemoveFromFavs = e =>{
    const favMovies= localStorage.getItem('favs')
    let tempMoviesInFavs;
  if (favMovies === null) {
    tempMoviesInFavs = []
  
  }else {
    tempMoviesInFavs = JSON.parse(favMovies);

  }
    
    
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgUrl = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const movieData = {
      imgUrl, title,overview,
      id: btn.dataset.movieId
    }
    let movieIsInArray = tempMoviesInFavs.find(oneMovie => {
      return oneMovie.id === movieData.id
    });
    if (!movieIsInArray) { 
      tempMoviesInFavs.push(movieData);
      localStorage.setItem('favs',JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs)
      console.log('se agrego la pelicula')

    }
    else {
    let movieLeft = tempMoviesInFavs.filter(oneMovie => {
      return oneMovie.id !== movieData.id
    });
    localStorage.setItem('favs',JSON.stringify(movieLeft));
    setFavorites(movieLeft);
    console.log('se elimino la pelicula')
  }
}
  return (
    <>
      <Header favorites={favorites}/>
        <div className="container my-3">
      <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/listado' render={ (props) => <Listado addOrRemoveFromFavs={addOrRemoveFromFavs}{...props}/> } />
          <Route path='/detalle' component={Detalle} />
          <Route path='/resultados' render={ (props) => <Resultados addOrRemoveFromFavs={addOrRemoveFromFavs}{...props}/> } /> />
          <Route path='/Favoritos' render={ (props) => <Favoritos favorites={favorites} addOrRemoveFromFavs={addOrRemoveFromFavs}{...props}/> } /> />
      </Switch>
      </div>
      <Footer />
    </>

  );
}

export default App;

import React, { useState, useEffect } from "react";
import "./styles.css";
import JokesList from "./JokesList";
import Buttons from "./Buttons";
import Favorites from "./Favorites";

export default function App() {
  const [jokes, setJokes] = useState();
  const [refreshabel, setRefreshable] = useState(false)
  const [favorites, setFavorites] = useState(false)
  const [favoritesJokes, setFavoritesJokes] = useState()
  
  function getJokes() {
    console.log(refreshabel);
    fetch(`https://api.chucknorris.io/jokes/random`)
    .then((response) => response.json())
    .then((json) => setJokes(json))
    if(refreshabel) {
      console.log(refreshabel);
      return setTimeout(()=>{
        getJokes()
      },3000)
    }
  }
  const refreshHandler = () => {
    setRefreshable(!refreshabel)
  }
  useEffect(() => {
    getJokes();
    // eslint-disable-next-line
  }, [refreshabel]);

  const addFavorite = (id, joke) => {
    const obj = {id: id, joke: joke}
    const storage = JSON.parse(localStorage.getItem('favorites') || '[]')
    console.log(storage.length);
    if(storage.length >= 10) {
      const sliced = storage.slice(1)
      sliced.push(obj)
      localStorage["favorites"] = JSON.stringify(sliced);
    } else {
      storage.push(obj)
      localStorage["favorites"] = JSON.stringify(storage);
    }
    setFavoritesJokes(JSON.parse(localStorage.getItem('favorites')))
  }
  const removeFavorite = (id) => {
    const storage = JSON.parse(localStorage.getItem('favorites') || '[]')
    storage.forEach(joke => {
      if(id === joke.id ) {
        const jokeIndex = storage.indexOf(joke)
        storage.splice(jokeIndex, 1)
        localStorage["favorites"] = JSON.stringify(storage);
        setFavoritesJokes(JSON.parse(localStorage.getItem('favorites')))
      }
    });
  }
  const removeAllFromFavrotites = () => {
    localStorage.clear()
    setFavoritesJokes(JSON.parse(localStorage.getItem('favorites')));
  }
  const getFavorites = () => {
    console.log(favoritesJokes);
    setFavoritesJokes(JSON.parse(localStorage.getItem('favorites')));
  }
  const showFavorites = () => {
    setFavorites(!favorites)
  }
  useEffect(() => {
    getJokes();
    // eslint-disable-next-line
  }, [refreshabel]);

  useEffect(() => {
    getFavorites()
    console.log(favoritesJokes);
    // eslint-disable-next-line
  }, [favorites])
  return (
    <div className="App">
      <h1>&lt;InCodeWeTrust /&gt;</h1>
      <h2>Клуб Фронтенд Джентельменов</h2>
      <Buttons favorites={favorites} refreshable={refreshHandler} getJokes={getJokes} showFavorites={showFavorites} />
      {jokes && !favorites ? <JokesList jokes={jokes} addFavorite={addFavorite} /> : ''}
      {favorites ? <Favorites removeAllFromFavrotites={removeAllFromFavrotites} removeFavorite={removeFavorite} favoritesJokes={favoritesJokes} /> : ''}
    </div>
  );
}
import React from "react";
import "./styles.css";

export default function Favorites(props) {
  return (
    <div>
      <h3>favorites list</h3>
      <button className="btn_default remove" onClick={props.removeAllFromFavrotites}>Clear all</button>
      <div>
        {props.favoritesJokes ? props.favoritesJokes.map(favoritesJoke => {
          return (
            <div className="joke_wrapper" key={favoritesJoke.id}>
              <button className="btn_default remove" onClick={()=>props.removeFavorite(favoritesJoke.id)}>remove</button>
              <p className="joke_text">{favoritesJoke.joke}</p>
            </div>
          )
        }): 'Add jokes in your list'}
        <p></p>
      </div>
    </div>
  );
}
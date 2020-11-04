import React from "react";
import "./styles.css";

export default function JokesList(props) {
  return (
    <div>
      <h3>jokes list</h3>
      <div className="joke_wrapper">
        <button className="btn_default" onClick={() => props.addFavorite(props.jokes.id, props.jokes.value)}>add to favorute</button>
        <p className="joke_text">{props.jokes.value}</p>
      </div>
    </div>
  );
}
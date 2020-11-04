import React from "react";
import "./styles.css";

export default function Buttons(props) {
  return (
    <div className="btns_wrapper">
      <button className="btn_default" onClick={props.getJokes}>new joke</button>
      <button className="btn_default" onClick={props.refreshable}>auto joke</button>
      <button className="btn_default" onClick={props.showFavorites}>{props.favorites ? 'random jokes':'favorite jokes'}</button>
    </div>
  );
}
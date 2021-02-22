import "./App.css";
import React, { useState } from "react";
import ResultBox from "./Components/ResultBox";
import { IoHeartCircleSharp } from "react-icons/io5";
import Favorites from "./Components/Favorites";

function App() {
  const [results, setResults] = useState([]);
  const [kind, setKind] = useState("all");
  const [limit, setLimit] = useState("10");
  const [displayFavorites, setDisplayFavorites] = useState(false);

  //The search function is called on the evt key press of "Enter", it calls the fetch function from the
  //backend and shows the results as a "ResultBox" item. The search also includes the parameters for media
  //type(using a dropdown) and limit(using a slider) of results that can be chosen
  const search = async (evt) => {
    if (evt.key === "Enter") {
      await fetch(`/search/${kind}/${evt.target.value}/${limit}`)
        .then((res) => res.json())
        .then((response) => setResults(response.results));
    }
  };

  return (
    <div className="app-body">
    {displayFavorites && <Favorites onHide={() => setDisplayFavorites(false)}/>}
      <div className="heading-container">
      <h2 className="heading" onClick="">My Faves</h2>
      <IoHeartCircleSharp className="fav-page-btn" onClick={() => setDisplayFavorites(true)}/>
      </div>
      <div className="search-box">
        <div class="slidecontainer">
        <label for="kind">Media</label>
        <label for="myRange">No of Results</label>
        <select
          name="kind"
          id="kind"
          onChange={(evt) => setKind(evt.target.value)}
          className="media"
        >
          <option value="movie">Movie</option>
          <option value="podcast">Podcast</option>
          <option value="music">Music</option>
          <option value="audiobook">AudioBook</option>
          <option value="shortFilm">Short Film</option>
          <option value="tvShow">Tv Show</option>
          <option value="software">Software</option>
          <option value="all" selected="selected">
            All
          </option>
        </select>
          <input
            type="range"
            min="1"
            max="50"
            value={limit}
            class="slider"
            id="myRange"
            onChangeCapture={(evt) => setLimit(evt.target.value)}
          ></input>
          <input type="text" className="result-limit" value={limit} />
          <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          onKeyPress={search}
        />
        </div>        
        
      </div>
      {results.length === 0 ? (
        <h3>No results</h3>
      ) : (
        results.map((result) => (
          <ResultBox
            trackName={result.trackName}
            artistName={result.artistName}
            artworkUrl100={result.artworkUrl100}
            display={true}
          />
        ))
      )}
    </div>
  );
}

export default App;

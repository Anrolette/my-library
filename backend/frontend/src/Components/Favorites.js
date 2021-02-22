import "../App.css";
import React, { useState, useEffect } from "react";
import ResultBox from "./ResultBox";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Favorites(props) {
  const [favorites, setFavorites] = useState([]);

  //We check what in the local storage and set it anew once an item as been added
  useEffect(() => {
    if (sessionStorage.getItem("favorites")) {
      let favorites = JSON.parse(sessionStorage.getItem("favorites"));
      setFavorites(favorites);
    }
  }, []);

  //we show all the items that are in the session storage along with a delete icon. This page can be closed
  return (
    <div className="favs-body">
      <div className="heading-container">
        <h2 className="heading">Saved Favorites</h2>
        <AiOutlineCloseCircle
          className="fav-close-btn"
          onClick={() => props.onHide()}
        />
      </div>

      {favorites.length === 0 ? (
        <h3>No favorites yet</h3>
      ) : (
        favorites.map((favorite) => (
          <ResultBox
            trackName={favorite.trackName}
            artistName={favorite.artistName}
            artworkUrl100={favorite.artworkUrl100}
            display={false}
            favorites={() => setFavorites(JSON.parse(sessionStorage.getItem("favorites")))}
          />
        ))
      )}
    </div>
  );
}

export default Favorites;

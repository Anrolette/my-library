import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

//This function handles & displays everythign that happens with our search results after reciveing
//them from the API
function ResultBox(props) {
  let [clicked, setClicked] = useState("fav-btn");

  //this function  handles changing the colours of the ehart icon when its been clicked, and
  //calls the addToFav function execution
  const favoriteClick = () => {
    if (clicked === "fav-btn") {
      setClicked("fav-btn-click");
    } else {
      setClicked("fav-btn");
    }
    addToFav();
  };

  //here we check in the session storage - if it exists - what and how many objects have been stored
  //so that we can create our favorites list, check by imsge URL & trackName. We can see whether the
  //icon should be gray or red too
  useEffect(() => {
    if (sessionStorage.getItem("favorites")) {
      let favorites = JSON.parse(sessionStorage.getItem("favorites"));
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].artworkUrl100 === props.artworkUrl100 && favorites[i].trackName === props.trackName) {
          setClicked("fav-btn-click");
          break;
        } else {
          setClicked("fav-btn");
        }
      }
    }
  });

  //function to add a result to the favorites list. We cehck wheter favorites exist already by getting session
  //storage, if empty we set by adding the selected result(item) to the session storage.
  //We push the item into the favorites array in the session storage.
  const addToFav = () => {
    let favorites;
    if (sessionStorage.getItem("favorites")) {
      favorites = JSON.parse(sessionStorage.getItem("favorites"));
    } else {
      sessionStorage.setItem("favorites", "[]");
      favorites = JSON.parse(sessionStorage.getItem("favorites"));
    }
    let item = {
      trackName: props.trackName,
      artistName: props.artistName,
      artworkUrl100: props.artworkUrl100,
    };
    favorites.push(item);
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  };

  
  //We get and check the items in the session storage array. If the art URL and trackName of selected matches to one
  //in the session storage we splice the selected one to remove from the array and move everything up
  //optimilly leaving no gaps. We set the array again minus the one we "deleted"
  const removeFromFav = () => {
    if (sessionStorage.getItem("favorites")) {
      let favorites = JSON.parse(sessionStorage.getItem("favorites"));
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].artworkUrl100 === props.artworkUrl100 && favorites[i].trackName === props.trackName) {
          favorites.splice(i, 1);
          break;
        }
      }
      sessionStorage.setItem("favorites", JSON.stringify(favorites));
      props.favorites();
    }
  };

  //We return a "item" that includes the track Name (or equivalent available)
  //the artName and an image. On the image is the heart icons for adding it to your favorites,
  //and the trashcan icon for when you want to delete the item.
  return (
    <div className="item-result">
      <h4>
        {props.trackName === undefined ? "Not available" : props.trackName}
      </h4>
      <p>
        {props.artistName === undefined ? "Not available" : props.artistName}
      </p>
      <div className={props.display ? "item-image" : "item-image-off"}>
        <img width="100" height="auto" src={props.artworkUrl100}></img>
        {props.display && (
          <FaHeart className={clicked} onClick={() => favoriteClick()} />
        )}
        {!props.display && (
          <MdDelete className="delete-fav" onClick={() => removeFromFav()} />
        )}
      </div>
    </div>
  );
}

export default ResultBox;

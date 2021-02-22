import React from "react";
import ResultBox from "./Components/ResultBox.js";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(
  
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
    </div>)
  .toJSON;
  expect(tree).toMatchSnapshot();
});

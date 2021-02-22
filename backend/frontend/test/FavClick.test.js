const favoriteClick = () => {
  if (clicked === "fav-btn") {
    setClicked("fav-btn-click");
  } else {
    setClicked("fav-btn");
  }
  addToFav();
};

test("determines className based on clicked or not", () => {
  expect(favoriteClick(setClicked === "fav-btn")).toBe("fav-btn");
});

const express = require("express");
router = express.Router();
const fetch = require("node-fetch");

//we use a router to get the category, term and limit the user inputs as parameters and make that the
//result, the return that as JSON when we get the response from the API
router.get("/:category/:term/:limit", async function (req, res, next) {
  let result = await search(req.params.category, req.params.term, req.params.limit);
  res.json(result);
});

async function search(category, term, limit) {
  let response;
  await fetch(`https://itunes.apple.com/search?media=${category}&term=${term}&limit=${limit}`)
    .then((res) => res.json())
    .then((result) => (response = result));
  return response;
}

module.exports = router;

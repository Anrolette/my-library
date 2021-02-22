const express = require("express");
const app = express();
const fetch = require("node-fetch");
const helmet = require("helmet");

app.use(helmet());

// we use the backend - from search.js to get result from the iStore
app.use("/search/", require("./routes/search"));

// To get the port number from the environment variables instead of hard coding it, we use the following code:
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

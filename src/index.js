const express = require("express");
const setUpRoutes = require("./router");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

setUpRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

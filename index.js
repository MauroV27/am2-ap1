const express = require('express');
const routes = require("./routes");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use("/", routes);

app.listen(port, () => {
  console.log(`Aplication runnig in http://localhost:${port}`);
})


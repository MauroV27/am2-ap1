const express = require('express');
const routes = require("./routes");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 3000;

const users = [{
  name : "Mauro Victor",
  email : "mauro@teste.com",
  address : "Lugar nenhum, rua imaginaria, 42",
  age: 21,
  height : 182,
  vote : true,
},
{
  name : "Fulano de Tal",
  email : "fulano@teste.com",
  address : "Lugar nenhum, rua dos sonhos, 10",
  age: 21,
  height : 182,
  vote : true,
}];

global.users = users

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.urlencoded({extended:false})); 
app.use(express.json()); 

app.use("/", routes);

app.listen(port, () => {
  console.log(`Aplication runnig in http://localhost:${port}`);
})


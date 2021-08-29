const express = require('express');
const routes = require("./routes");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 3000;

const users = [
  { name : "Mauro Victor", email : "mauro@teste.com", vote : true},
  { name : "Fulano de Tal", email : "fulano@teste.com", vote : false},
  { name : "Cicrano da Silva", email : "cSilva@teste.com", vote : false},
  { name : "Oh Bama", email : "ooohhhBaaama@teste.com", vote : false},
  { name : "Filipe Beto", email : "filiBeto@teste.com", vote : false},
  { name : "Cade Moura", email : "cadeMou@teste.com", vote : false},
  { name : "Elun Nusk", email : "elunNusk@teste.com", vote : true},
  { name : "Billy Doors", email : "bilDoors@teste.com", vote : true},
  { name : "Steve Bots", email : "badApple@teste.com", vote : true},
  { name : "Mark Zunsjdjeberg", email : "markBerg@teste.com", vote : false},
];

global.users = users

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.urlencoded({extended:false})); 
app.use(express.json()); 

app.use("/", routes);

app.listen(port, () => {
  console.log(`Aplication runnig in http://localhost:${port}`);
})


const express = require("express");
const router = express.Router();

router.use(express.static("public"));

router.get('/', (req, res) => {
    res.render("pages/home");
});

router.get('/home', (req, res) => {
    res.render("pages/home");
});

router.get('/about', (req, res) => {
    const users = [{
        name : "Mauro",
        email : "mauro@teste.com",
    }];
    res.render("pages/about", {users});
});

router.get('/register', (req, res) => {
    res.render("pages/register");
});

module.exports = router;

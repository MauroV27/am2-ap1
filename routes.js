const express = require("express");
const router = express.Router();
const utils = require("./utils");

router.use(express.static("public"));

router.get('/', (req, res) => {
    res.render("pages/home");
});

router.get('/home', (req, res) => {
    res.render("pages/home");
});

router.get('/about', (req, res) => {
    res.render("pages/about");
});

router.get('/register', (req, res) => {
    res.render("pages/register", {users: users});
});

router.post("/register/update", (req, res) => {

    const user_id = req.body.id;

    users[user_id].name = req.body.name; 
    users[user_id].email = req.body.email;
    users[user_id].address = req.body.address;
    users[user_id].age = req.body.age;
    users[user_id].heigth = req.body.heigth;
    users[user_id].vote = req.body.vote;
    
    res.sendStatus(200); //envia mensagem 200 significando que as modificacoes foram ok
    console.log("Dados recebidos: ", req.body);//mostra no console do servidor os dados recebidos
});

router.post("/register/remove", (req, res) => {
    const user_id =req.body.id;  //pega o valor passado através do parâmetro id e atribui a variável item. 

    if ( user_id < 0 || user_id >= users.length ){
        console.log(`User com id: ${user_id}, não foi encontrado no sistema. Logo não pode ser removido.`);
        return res.status(500).json({
            status:'error',
            error:`Didn't Remove element: ${user_id}`
        });
    }

    // Remove as informações do usuario selecionado de users, assim apagando o usuario do servidor.
    const user_removed = users.splice( user_id,1);   
    if ( user_removed.length != 0 ){
        // Retorna OK, caso a remoção tenha ocorrido sem problemas;
        return res.status(200).json({ 
            status:'sucess',
            data: user_removed
        });   
    } else{
        // Retorna um erro, caso tenha ocorrido um problema durante a remoção;
        return res.status(400).json({
            status:'error',
            error:`Didn't Remove element: ${user_removed}}`
        });
    }
});

router.post("/register/add", async (req, res) => {
    const {data_to_submit, data_status} = await utils.validateInputData(req.body);

    if (data_status.status){
        const user = await utils.formatData(data_to_submit);
        users.push(user);
        console.log("Usuário cadastrado:");
        console.table(user);
        
        // res.sendStatus(200);
        // res.status(200).json({
        //     status:'sucess',
        //     data: `Usuário ${user.name} foi adiocionado com sucesso!`
        // });

        res.render("pages/register", {users: users});
    } else {
        return res.status(400).json({
            status:'error',
            error: `Didn't register data because a error has oured in ${data_status.message}!`
        });
    }
});

router.get("/register/add", (req, res) => {
    res.render("pages/newRegister");
});

module.exports = router;

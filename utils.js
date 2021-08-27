function validateInputData(data){
    const data_status = {status : true, message : "dados validos recebidos"};

    if ( data.name == "" || data.name == null ) data_status.status = false, data_status.message = "Nome invalido";
    if ( data.email == "" || data.email == null ) data_status.status = false, data_status.message = "Email invalido";

    const data_to_submit = {name: " ", email: "", vote: false};

    data_to_submit.name = data.name;
    data_to_submit.email = data.email;
    data_to_submit.vote = data.vote == "voted-yes" ? true : false;

    return { data_to_submit , data_status};   
}

function formatData(data){
    const user={name:"",email:"",address:"",heigth:"",age:"",vote:""};

    user.name = data.name;
    user.email = data.email;
    user.address = data.address;
    user.heigth = data.heigth;
    user.age = data.age;
    user.vote = data.vote;

    return user;
}

module.exports = { validateInputData, formatData };
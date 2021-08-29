function show_edit_inputs(index, show_edit = true){
    //Essa função foi projetada para alternar a visibilidade de inputs/spans na linha com valor index
    const spans = document.querySelectorAll(`td[data-index-row='${index}'] > span`);
    const inputs = document.querySelectorAll(`td[data-index-row='${index}'] > input`);

    const icon_buttons = document.querySelector(`td[data-index-row='${index}'] > div[id="icon-buttons"]`);

    spans.forEach( (span) => {
        span.className = show_edit ? 'hidden' : 'show';
    });

    inputs.forEach( (input) => {
        input.className = show_edit ? 'show' : 'hidden';
    });

    icon_buttons.className = show_edit ? 'hidden' : 'show';
}


function update(index, link){
    const spans = document.querySelectorAll(`td[data-index-row='${index}'] > span`);
    const inputs = document.querySelectorAll(`td[data-index-row='${index}'] > input`);

    //Armazena os valores vindos do span para caso ocorra um erro na validação dos dados;
    const default_value = {id: index ,name: inputs[0].value ,email:inputs[1].value , vote:inputs[2].value};
    const data_structure = {id:"",name:"",email:"",vote:""};

    data_structure.id = index;
    data_structure.name = default_value.name;
    data_structure.email = default_value.email;
    data_structure.vote = default_value.vote;

    const {state, data_to_submit} = validateForm(data_structure);

    if ( state ) {
        const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
        http.open("POST",link,true); //abre uma comunicação com o servidor através de uma requisição POST
        http.setRequestHeader('Content-Type','application/json');

        //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON
        const dataToSend = JSON.stringify(data_to_submit);
        http.send(dataToSend);//envia dados para o servidor na forma de JSON

        http.onload = () =>{
            // Alternar os valores dos spans para os dos inputs adicionados;
            spans[0].innerHTML = data_to_submit.name;
            spans[1].innerHTML = data_to_submit.email;
            spans[2].innerHTML = data_to_submit.vote ? 'Sim' : 'Não';
            show_edit_inputs(index, false);
        };
    } else {
        // Alternar os valores dos spans para os dos spans por conta de algum erro na validação;
        spans[0].innerHTML = default_value.name;
        spans[1].innerHTML = default_value.email;
        spans[2].innerHTML = default_value.vote ? 'Sim' : 'Não';
    }
}

function last__update(index,link){
    //seleciona todas as tags que sejam td 
    //Antiga versão do código;
    let tds = document.querySelectorAll(`td[data-index-row='${index}']`);
    let spans = document.querySelectorAll(`td[data-index-row='${index}'] > span`);
    let inputs = document.querySelectorAll(`td[data-index-row='${index}'] > input`);
    let lenTds = tds.length-1; //numero de tds de uma linha da tabela
    let linkUpdate = tds[lenTds-1]; //retorna o conteudo da penultima td, no caso, o link de update
    let linkRemove = tds[lenTds];

    //cria uma conexao com o input que é do tipo button
    const button = document.querySelector(`td[data-index-row='${index}'] > input[type="button"]`);

    linkUpdate.className='hidden';
    linkRemove.className='hidden';
    tds[lenTds-1].className='show';

     //esconde todos os campos de exibição de dados do cadastro
    for(let cont=0;cont<spans.length;cont++){
        if(spans[cont].className=="show"){
            spans[cont].className="hidden";
        } else{
            spans[cont].className="show";
        }
    }
    //mostra os campos de preenchimento para o cadastro
    for(let cont=0;cont<inputs.length;cont++){
        if( inputs[cont].className=="hidden" ){
            inputs[cont].className="show";
        }
    }

    //escuta se o botao foi clicado
    button.addEventListener('click',()=>{
        const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
        const data = {id:"",name:"",email:"",vote:""};

        http.open("POST",link,true); //abre uma comunicação com o servidor através de uma requisição POST

        http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados

        //preenche um objeto com o indice da linha da tabela e os valores dos campos input do tipo text
        data.id = index;
        data.name = inputs[0].value;
        data.email = inputs[1].value;
        data.vote = inputs[2].value;

        const dataToSend = JSON.stringify(data); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON

        http.send(dataToSend);//envia dados para o servidor na forma de JSON

        /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */

        http.onload = ()=>{                
                for(let cont=0;cont<spans.length;cont++){
                    if(spans[cont].className=="hidden"){
                        spans[cont].innerHTML = inputs[cont].value;
                        spans[cont].className="show";
                    } else{
                        spans[cont].className="hidden";
                    }
                }
    
                //esconde os campos de preenchimento para o cadastro
                for(let cont=0;cont<inputs.length;cont++){
                    if(inputs[cont].className=="show"){
                        inputs[cont].className="hidden";
                    }
                }
    
                linkUpdate.className='show';
                linkRemove.className='show';
                tds[lenTds-1].className='hidden';
        }
    /*
    readyState:
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response is ready
    status:
    200: "OK"
    403: "Forbidden"
    404: "Page not found"
    */
    // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

    http.onreadystatechange = (e)=>{
        if (http.readyState === 4 && http.status === 200) { //testa se o envio foi bem sucedido
            console.log(http.responseText);

        }
    }

    });  

}

function remove(index,link){

    const confirm_remove_item = confirm("Deseja excluir esse item?")

    if ( confirm_remove_item == false ){
        return 
    }

    const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor

    http.open("POST", link, true); //abre uma comunicação com o servidor através de uma requisição POST

    http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados

    const dataToSend = JSON.stringify({id: index}); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON

    http.send(dataToSend); //envia dados para o servidor na forma de JSON

    http.onload = ()=> { 

        if ( http.readyState === 4 && http.status === 200) {
            // tr.remove();
            // list_users(link);
            location.reload();
        } else {
            console.log(`Erro durante a tentativa de remoção do usuário! Código do Erro: ${http.status}`); 
        }

    }
}

function validateForm(data_to_validate){
    if ( data_to_validate.name.length < 3 || data_to_validate.name == null ) {
        alert("Digite um nome valido");
        return {state:false};
    }
    // /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data_to_validate.email) uso de regex para validar um email 
    // Referência usada: https://www.w3resource.com/javascript/form/email-validation.php
    if ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data_to_validate.email) == false|| data_to_validate.email == null ) {
        alert("Digite um email valido");
        return {state:false}
    }

    const data_to_submit = {name: " ", email: "", vote: false};

    data_to_submit.id = data_to_validate.id;
    data_to_submit.name = data_to_validate.name;
    data_to_submit.email = data_to_validate.email;
    data_to_submit.vote = data_to_validate.vote.toLowerCase() == "sim" ? true : false;

    // console.table(data_to_submit);    //Visualiza os dados validados no cliente;
    return {state:true, data_to_submit};
}

function list_users(link){
    const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor

    http.open('GET', link ,true); //abre uma comunicação com o servidor através de uma requisição POST
    http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados
    http.send(null);//envia dados para o servidor na forma de JSON

    http.onload = ()=> { 
        if ( http.readyState !== 4 && http.status !== 200) {
            console.log(`Erro durante a listagem de usuários! Código do Erro: ${http.status}`); 
        }
        location.reload()

    }
}
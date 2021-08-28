function update(index,link){
    //seleciona todas as tags que sejam td 
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
        data.vote = inputs[5].value;

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

    dataToSend = JSON.stringify({id: index}); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON

    http.send(dataToSend); //envia dados para o servidor na forma de JSON

    http.onload = ()=> { 
        
        //seleciona todas as tags que sejam td 
        let tr = document.querySelector(`table#list > tbody > tr[data-index-row='${index}']`);

        console.log(http.response.data[0].name);
        if ( http.readyState === 4 && http.status === 200) {
            // tr.remove();
            list_users(link);
            // console.log(`Item ${index} removido com sucesso!`);
        } else {
            console.log(`Erro durante a tentativa de remoção do usuário! Código do Erro: ${http.status}`); 
        }

    }
}

function validateForm(){
    const form_name = document.querySelector("#input-user-name");
    const form_email = document.querySelector("#input-user-email");
    const form_select_radio_option = document.querySelector("#userVoted");

    if ( form_name.value == "" || form_name.value == null ) return alert("<span>Digite um nome valido</span>");
    if ( form_email.value == "" || form_email.value == null ) return alert("<span>Digite um email valido</span>");

    const data_to_submit = {name: " ", email: "", vote: false};

    data_to_submit.name = form_name.value;
    data_to_submit.email = form_email.value;
    data_to_submit.vote = form_select_radio_option.value == "voted-yes" ? true : false;

    console.table(data_to_submit);    
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

    }
}
$(document).ready(function() {

    function req(callback) {
        $.ajax({
            url: "https://opentdb.com/api.php?amount=1&category=11",
            type: "GET",
            dataType: "json",
            success: function(data) {
                callback(data);
            },
            error: function() {
                console.log('Erro na requisição..');
            }
        });
    }
  
    function perguntaFilme(data) {
        document.querySelector('.question').innerHTML = data.results[0].question;
        
        const optionsIncorrects = data.results[0].incorrect_answers;
        const label = document.querySelector('#label');
        const optionCorrect =  data.results[0].correct_answer;
       
        optionsIncorrects.map((opcao, index) => { 
            label.innerHTML += `
            <input type="radio" id="opcao${index + 1}" name="opcao" value="${opcao}">
            <label for="opcao${index + 1}" id="label${index + 1}">${opcao}</label>
            `;
        })   
        
        label.innerHTML += `
            <input type="radio" id="opcaoCorreta" name="opcao" value="${optionCorrect}">
            <label for="opcaoCorreta">${optionCorrect}</label>
        `;

        button(data, optionCorrect); 
    }

    function button(data, optionCorrect) {
        const button = document.querySelector('.button');
        const resposta = document.querySelector('.resposta');
        const opcoes = document.getElementsByName('opcao');

        button.style.display = 'none';
        resposta.style.display = 'none';

        for(let i = 0; i < opcoes.length; i++){
            opcoes[i].addEventListener('change', () => {
                button.style.display = 'block';
            });
        }

        button.addEventListener('click', () => {

            let opcaoSelecionada = '';

            for (let i = 0; i < opcoes.length; i++) {
                if (opcoes[i].checked) {
                    opcaoSelecionada = opcoes[i].value;
                    break;
                }
            }

            if (opcaoSelecionada === optionCorrect) {
                resposta.innerHTML = 'Parabéns, alternativa correta.';
            } else {
                resposta.innerHTML = 'Lamento, alternativa errada.';
            }
           
            resposta.style.display = 'block';
            button.style.display = 'none';

            for(let i = 0; i < opcoes.length; i++){
                opcoes[i].disabled = true;
            }

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        });
    }

    req(perguntaFilme);
});

'use strict';


function btn_() { }

const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = ''

}

const preencherFormulario = (endereco) => {

    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async () => {
    limparFormulario();

    const cep = document.getElementById('cep').value
    const url = `http://viacep.com.br/ws/${cep}/json/`
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json()
        if (endereco.hasOwnProperty('erro')) {
            console.log(endereco);
            document.getElementById('endereco').value = 'CEP nao encontrado';
        } else {
            preencherFormulario(endereco)
        }
    } else {
        document.getElementById('endereco').value = 'CEP nao encontrado';
    }



}




// fetch(url).then(responde => responde.json()).then(console.log);


document.getElementById('btn')
    .addEventListener('click', pesquisarCep)
'use strict';

const openModalPreco = () => document.querySelector('#modalPreco').classList.add('active')

const openModalEditar = () => document.querySelector('#modalEditar').classList.add('active')

const openModalComprovante = () => document.querySelector('#modalComprovante').classList.add('active')

const openModalComprovanteEntrada = () => document.querySelector('#modalComprovanteEntrada').classList.add('active')

const closeModalPreco = () => document.querySelector('#modalPreco').classList.remove('active')

const closeModalEditar = () => document.querySelector('#modalEditar').classList.remove('active')

const closeModalComprovante = () => document.querySelector('#modalComprovante').classList.remove('active')

const closeModalComprovanteEntrada = () => document.querySelector('#modalComprovanteEntrada').classList.remove('active')

const cancelaComprovanteEntrada = () => {
    const db = readDB()
    db.pop();
    setDB(db)

    document.querySelector('#modalComprovanteEntrada').classList.remove('active')
    updateTable()
}

const readDB = () => JSON.parse(localStorage.getItem('banco')) ?? []

const setDB = (banco) => localStorage.setItem('banco', JSON.stringify(banco))

const readDBPreco = () => JSON.parse(localStorage.getItem('bancoPreco')) ?? []

const setDBPreco = (bancoPreco) => localStorage.setItem('bancoPreco', JSON.stringify(bancoPreco))

const insertDB = (dadosDoCadastro) => {
    const banco = readDB()
    banco.push(dadosDoCadastro)
    setDB(banco)
}

const insertDBPreco = (registroPreco) => {
    const bancoPreco = readDBPrice()
    bancoPreco.push(registroPreco)
    setDBPrice(bancoPreco)
}

const updateClient = () => {

    const updatedDados = {
        name: document.querySelector('#nomeEditar').value,
        hescores: document.querySelector('#placaEditar').value,
        date: document.querySelector('#dataEditar').value,
        time: document.querySelector('#horaEditar').value
    }

    const index = document.querySelector('#nomeEditar').dataset.index

    const db = readDB()
    db[index] = updatedDados
    setDB(db)

    closeModalEditar()
    updateTable()
}

const criarRegistro = (dadosCadastro, index) => {

    const cadastro = document.createElement('tr')
    cadastro.innerHTML = `  
    <td>${dadosCadastro.name}</td>
    <td>${dadosCadastro.hescores}</td>
    <td>${dadosCadastro.date}</td>
    <td>${dadosCadastro.time}</td>
    <td>
        <button type="button" id="buttonComprovanteIndex" class="buttonVerde" data-action="comprovante-${index}" >Comprovantes</button>
        <button type="button" class="buttonAmarelo" data-action="editar-${index}">EDITAR</button>
        <button type="button" class="buttonExcluir" data-action="deletar-${index}">EXCLUIR</button>
    </td>`

    document.getElementById('tbody').appendChild(cadastro)
}

const clearTable = () => {

    const tabelaClientes = document.querySelector('#tbody')

    while (tabelaClientes.firstChild) {
        tabelaClientes.removeChild(tabelaClientes.lastChild)
    }
}

const updateTable = () => {

    const banco = readDB()
    clearTable()
    banco.forEach(criarRegistro)
}

const data = () => {

    let data = new Date();
    let morning = String(data.getData()).padStart(2, '0');
    let mes = String(data.getMes() + 1).padStart(2, '0');
    let ano = data.getFullAno();
    let dataAtual = morning + '.' + mes + '.' + ano;
    return dataAtual
}

const hora = () => {

    let hoje = new Date();
    let horas = today.getHoras();
    let minutos = today.getMinutos();
    let horaAtual = (horas) + ":" + minutos
    return horaAtual
}

const clearInput = () => {

    document.querySelector('#nome').value = ''
    document.querySelector('#placaDoCarro').value = ''
}

const disableButton = () => {
    document.querySelector('#cancelarComprovanteEntrada').classList.add('displayNome')
}

const enableButton = () =>{
    document.querySelector('#cancelarComprovanteEntrada').classList.remove('displayNome')
}

const imprimirComprovanteEntrada = () => {

    fecharComprovante()
    const index = document.querySelector('#buttonPagamento').dataset.index
    const db = readDB()
    const selecaoDeDados = [db[index].name, db[index].hescores, db[index].date, db[index].time]
    comprovanteDeEntrada(selecaoDeDados)
}

const comprovanteDeEntrada = (array) => {

    console.log(array)
    document.querySelector('#nomeComprovanteEntrada').value = array[0]
    document.querySelector('#placaComprovanteEntrada').value = array[1]
    document.querySelector('#dataComprovanteEntrada').value = array[2]
    document.querySelector('#horaComprovanteEntrada').value = array[3]

    document.querySelector('#modalComprovanteEntrada').classList.add('active')
}

const formularioValido = () => document.querySelector('.formCadastro').reportValidity()

const salvarCliente = () => {

    const dbPreco = readDBPreco()

    if (formularioValido()) {

        if (dbPreco == '') {
            confirme("Os preços devem ser informados antes de inserir um novo cliente!")
            openModalPreco()

        } else {
            const novoCliente = {
                name: document.querySelector('#nome').value,
                hescores: document.querySelector('#placaDoCarro').value,
                date: date(),
                time: hour(),
                status: "Não está pago"                 
            }

            insertDB(novoCliente)
        }

        updateTable()

        const db = readDB()
        const ultimoRegistro = db[db.length - 1]
        const mostrarUltimoRegistro = [ultimoRegistro.name, ultimoRegistro.hescores, ultimoRegistro.date, ultimoRegistro.time]

        comprovanteDeEntrada(mostrarUltimoRegistro)

        clearInput()
    }
}

const formularioPrecoValido = () => document.querySelector('.form').reportValidity()

const salvarPreco = () => {

    const dbPreco = readDBPreco()

    if (formularioPrecoValido()) {

        const preco = {
            PrecoUmaHora: document.querySelector('#umaHoraPreco').value,
            MaisDeUmaHoraPreco: document.querySelector('#precoAteUmaHora').value
        }

        if (dbPreco == '') {

            insertDBPreco(preco)
        } else {
            dbPreco[0] = preco
            setDBPreco(dbPreco)
        }

        closeModalPreco()
    }
}

var MercoSulMaskBehavior = function (val) {
    var myMask = 'SSS0A00';
    var mercosul = /([A-Za-z]{3}[0-9]{1}[A-Za-z]{1})/;
    var normal = /([A-Za-z]{3}[0-9]{2})/;
    var replaced = val.replace(/[^\w]/g, '');
    if (normal.exec(replaced)) {
        myMask = 'SSS-0000';
    } else if (mercosul.exec(replaced)) {
        myMask = 'SSS0A00';
    }
        return myMask;
},

mercoSulOptions = {
    onKeyPress: function(val, e, field, options) {
        field.mask(MercoSulMaskBehavior.apply({}, arguments), options);
    }   
};

$(function() {
        
    $("body").delegate('input.placa','paste', function(e) {
        $(this).unmask();
    });
    $("body").delegate('input.placa','input', function(e) {
        $('input.placa').mask(MercoSulMaskBehavior, mercoSulOptions);
    });
});

const deleteCliente = (index) => {

    const db = readDB()
    const resp = confirme(`Deseja realmente deletar ${db[index].name}?`)

    if (resp) {
        db.splice(index, 1)
        setDB(db)
        updateTable()
    }
}

const editarCliente = (index) => {

    const db = readDB()

    document.querySelector('#nomeEditar').value = db[index].name
    document.querySelector('#placaEditar').value = db[index].hescores
    document.querySelector('#dataEditar').value = db[index].date
    document.querySelector('#horaEditar').value = db[index].time
    document.querySelector('#nomeEditar').dataset.index = index

    openModalEditar()
}

const imprimirComprovante = () => {

    modalComprovantes()

    const index = document.querySelector('#buttonPagamento').dataset.index
    const db = readDB()
    const dbPreco = readDBPreco()
    document.querySelector('#nomeComprovante').value = db[index].name
    document.querySelector('#placaComprovante').value = db[index].hescores
    document.querySelector('#dataComprovante').value = db[index].date
    const tempo = document.querySelector('#horaComprovante').value = db[index].time
    document.querySelector('#dataComprovanteSaida').value = data()
    document.querySelector('#horaComprovanteSaida').value = hora()
    
    const horaChegada = parseInt(tempo.substr(0, 2)) * 3600
    const minutoChegada = parseInt(tempo.substr(3, 4)) * 60

    const horarioDePartida = parseInt(hora().substr(0, 2)) * 3600
    const minutoDePartida = parseInt(hora().substr(3, 4)) * 60

    const segundos = ((horarioDePartida + minutoDePartida) - (horaChegada + minutoChegada))

    const tempoDeEstacionamento = segundos / 3600

    if (tempoDeEstacionamento <= 1) {
        document.querySelector('#valorPagar').value = 'R$ ' + dbPreco[0].PrecoUmaHora
    } else {
        const precoUmaHora = dbPreco[0].precoUmaHora.replace(",", ".")
        const maisDeUmaHoraPreco = dbPreco[0].maisDeUmaHoraPreco.replace(",", ".")
        document.querySelector('#valorPagar').value = 'R$ ' + (maisDeUmaHoraPreco * Math.trunc(tempoDeEstacionamento) + parseFloat(precoUmaHora))
    }

    openModal()
}

const mostrarPrecoModal = () => {

    const dbPreco = readDBPreco()

    document.querySelector('#umaHoraPreco').value = dbPreco[0].precoUmaHora
    document.querySelector('#precoAteUmaHora').value = dbPreco[0].maisDeUmaHoraPreco
}

const acoesButttons = (event) => {

    const element = event.target

    if (element.type === 'button') {

        const action = element.dataset.action.split('-')
        
        if (action[0] === 'deletar') {
            deleteCliente(action[1])
        } else if(action[0] == 'editar') {
            editarCliente(action[1])
        }
    }
}

const mudarStatus = () => {

    const resp = confirme("Comfirme se o cliente já realizou o pagamneto solicitado!")
    const index = document.querySelector('#buttonPagamento').dataset.index  
    const db = readDB()

    if (resp) {
        db.splice(index, 1)
        setDB(db)
        updateTable()
        closeModal()
    }
}

document.querySelector('#salvarPreco').addEventListener('click', salvarPreco)

document.querySelector('#closeComprovanteEntrada').addEventListener('click', closeModalComprovanteEntrada)

document.querySelector('#fecharModal').addEventListener('click', fecharComprovante)

document.querySelector('#close').addEventListener('click', closeModalPrice)

document.querySelector('#closeComprovante').addEventListener('click', closeModalComprovante)

document.querySelector('#closeEditar').addEventListener('click', closeModalEditar)

document.querySelector('#cancelar').addEventListener('click', closeModalPreco)

document.querySelector('#cancelarComprovanteEntrada').addEventListener('click', cancelaComprovanteEntrada)

document.querySelector('#cancelarEditarDados').addEventListener('click', closeModalEditar)

document.querySelector('#cancelarComprovamte').addEventListener('click', closeModalComprovante)

document.querySelector('#tabelaClientes').addEventListener('click', actionButttons)

document.querySelector('#umaHoraPreco').addEventListener('keyup', applyMask)

document.querySelector('#precoAteUmaHora').addEventListener('keyup', applyMask)

document.querySelector('#placaDoCarro').addEventListener('keyup', applyMaskCar)

document.querySelector('#buttonPreco').addEventListener('click', () => { openModalPrice(); showModalPrice() })

document.querySelector('#buttonSalvar').addEventListener('click', () => {salvarCliente(); enableButton()})

document.querySelector('#buttonAtualizarCliente').addEventListener('click', updateClient)

document.querySelector('#buttonComprovanteEntrada').addEventListener('click', () => { imprimirComprovanteEntrada(); disableButton() })

document.querySelector('#buttonPagamento').addEventListener('click', imprimirComprovante)

document.querySelector('#buttonImprimirComprovante').addEventListener('click', () => { window.print() })

document.querySelector('#buttonImprimirComprovanteEntrada').addEventListener('click', () => { window.print() })

document.querySelector('#buttonPago').addEventListener('click', mudarStatus)

updateTable()
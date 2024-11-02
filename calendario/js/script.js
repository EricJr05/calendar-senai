
//------------MENU------------//
const open = document.getElementById('abrir');
const menu = document.getElementById('menu');
const close = document.getElementById('fechar');
const chk = document.getElementById('chk');
const fundo = document.querySelector('body');

open.addEventListener('click', () => {
    menu.showModal();
    document.querySelector('input').style.opacity = 0;
});

close.addEventListener('click', () => {
    menu.close();
    document.querySelector('input').style.opacity = 1;
});

chk.addEventListener('change', () => {
    if (chk.checked) {
        fundo.style.backgroundImage = "url('./img/nuvens.jpg')";
    } else {
        fundo.style.backgroundImage = "url('./img/noite-escuro.jpg')";
    }
});



//------------CALENDÁRIO MENSAL------------//
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
let dataAtual = new Date();
let mesAtual = dataAtual.getMonth();
let anoAtual = dataAtual.getFullYear();
let diaAtual = dataAtual.getDate();

function diasNoMes(mes, ano) {
    return new Date(ano, mes + 1, 0).getDate();
}

function primeiroDiaDoMes(mes, ano) {
    return new Date(ano, mes, 1).getDay();
}

function changeMonth(direcao) {
    const main = document.querySelector('main');
    main.classList.add(direcao === 1 ? 'proximo' : 'anterior');

    setTimeout(() => {
        mesAtual += direcao;

        if (mesAtual < 0) {
            mesAtual = 11;
            anoAtual--;
        } else if (mesAtual > 11) {
            mesAtual = 0;
            anoAtual++;
        }

        document.getElementById('mes').textContent = `${meses[mesAtual]} ${anoAtual}`;
        document.getElementById('mensagem').textContent = '';

        main.classList.remove(direcao === 1 ? 'proximo' : 'anterior');
        CalendarioMensal();
    }, 900);
}

function CalendarioMensal() {
    document.getElementById('mes').textContent = `${meses[mesAtual]} ${anoAtual}`;
    const diasContainer = document.getElementById('dias');
    diasContainer.innerHTML = '';

    const totalDias = diasNoMes(mesAtual, anoAtual);
    const primeiroDia = primeiroDiaDoMes(mesAtual, anoAtual);
    const diasAnteriores = primeiroDia;
    const diasDoMesAnterior = mesAtual === 0 ? diasNoMes(11, anoAtual - 1) : diasNoMes(mesAtual - 1, anoAtual);

    for (let i = diasDoMesAnterior - diasAnteriores + 1; i <= diasDoMesAnterior; i++) {
        const diaDiv = document.createElement('div');
        diaDiv.className = 'dia MP';
        diaDiv.textContent = i;
        diaDiv.setAttribute('data-date', `${anoAtual}-${mesAtual === 0 ? 12 : mesAtual}-${i < 10 ? '0' + i : i}`);
        diaDiv.addEventListener('click', () => {
            diaDiv.style.backgroundColor = diaDiv.style.backgroundColor === '' ? 'rgb(240, 255, 33)' : '';
            const mesAnterior = mesAtual === 0 ? 'Dezembro' : meses[mesAtual - 1];
            document.getElementById('mensagem').textContent = `Você clicou no dia ${i} de ${mesAnterior}`;
            abrirModal(diaDiv);
        });
        diasContainer.appendChild(diaDiv);
    }

    for (let i = 1; i <= totalDias; i++) {
        const diaDiv = document.createElement('div');
        diaDiv.className = i === diaAtual && mesAtual === dataAtual.getMonth() && anoAtual === dataAtual.getFullYear() ? 'dia hoje' : 'dia';
        diaDiv.textContent = i;
        diaDiv.setAttribute('data-date', `${anoAtual}-${mesAtual + 1}-${i < 10 ? '0' + i : i}`);
        diaDiv.addEventListener('click', () => {
            diaDiv.style.backgroundColor = diaDiv.style.backgroundColor === '' ? 'rgb(240, 255, 33)' : '';
            document.getElementById('mensagem').textContent = `Você clicou no dia ${i} de ${meses[mesAtual]}`;
            abrirModal(diaDiv);
        });
        diasContainer.appendChild(diaDiv);
    }

    const limite = 42 - diasContainer.children.length;
    for (let i = 1; i <= limite; i++) {
        const diaDiv = document.createElement('div');
        diaDiv.className = 'dia PM';
        diaDiv.textContent = i;
        diaDiv.setAttribute('data-date', `${anoAtual}-${mesAtual === 11 ? 1 : mesAtual + 2}-${i < 10 ? '0' + i : i}`);
        diaDiv.addEventListener('click', () => {
            diaDiv.style.backgroundColor = diaDiv.style.backgroundColor === '' ? 'rgb(240, 255, 33)' : '';
            const proximoMes = mesAtual === 11 ? 'Janeiro' : meses[mesAtual + 1];
            document.getElementById('mensagem').textContent = `Você clicou no dia ${i} de ${proximoMes}`;
            abrirModal(diaDiv);
        });
        diasContainer.appendChild(diaDiv);
    }
}


CalendarioMensal();



//------------CALENDÁRIO SEMANAL------------//
function CalendarioSemanal() {
    setaSemanal();
    document.getElementById('mensagem').textContent = '';
    document.getElementById('mes').textContent = '';
    const calendarioElemento = document.getElementById('dias');
    const diasContainer = calendarioElemento;
    diasContainer.innerHTML = '';

    for (let i = 0; i < 7; i++) {
        const data = new Date(dataAtual);
        data.setDate(dataAtual.getDate() + i);

        const diaElemento = document.createElement('div');
        diaElemento.className = 'diaSemana';
        diaElemento.innerText = data.toLocaleDateString();
        
        const ano = data.getFullYear();
        const mes = data.getMonth() + 1;
        const dia = data.getDate();
        diaElemento.setAttribute('data-date', `${ano}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`);

        diaElemento.addEventListener('click', () => {
            diaElemento.style.backgroundColor = diaElemento.style.backgroundColor === '' ? 'rgb(240, 255, 33)' : '';
            document.getElementById('mensagem').textContent = `Você clicou no dia ${dia} de ${meses[mes - 1]}`;
            abrirModal(diaElemento);
        });

        diasContainer.appendChild(diaElemento);
    }
}

function changeWeek(i) {
    dataAtual.setDate(dataAtual.getDate() + (i * 7));
    CalendarioSemanal();
}




//------------ESCOLHA------------//
const escolha = document.getElementById('escolha');
const botaoAtualizar = document.getElementById('confirmarEscolha');
const diasContainer = document.getElementById('dias');

botaoAtualizar.addEventListener('click', () => {
    const selecionado = escolha.value;

    diasContainer.classList.add('fade-out');

    setTimeout(() => {
        if (selecionado === 'mensal') {
            CalendarioMensal();
            setaMensal();
        } else if (selecionado === 'semanal') {
            CalendarioSemanal();
            setaSemanal();
        }

        diasContainer.classList.remove('fade-out');
        diasContainer.classList.add('fade-in');

        setTimeout(() => {
            diasContainer.classList.remove('fade-in');
        }, 500);
    }, 300);
});



//------------ALTERAR SETAS------------//
function setaSemanal() {
    document.getElementById('seta-esquerda').onclick = function () {
        changeWeek(-1);
    };

    document.getElementById('seta-direita').onclick = function () {
        changeWeek(1);
    };
}

function setaMensal() {
    document.getElementById('seta-esquerda').onclick = function () {
        changeMonth(-1);
    };

    document.getElementById('seta-direita').onclick = function () {
        changeMonth(1);
    };
}



//------------TEMAS------------//
document.querySelectorAll('dialog .temas img').forEach((img, index) => {
    img.addEventListener('click', () => {
        switch (index) {
            case 0:
                fundo.style.backgroundImage = "url('./img/fundo.jpg')";
                break;
            case 1:
                fundo.style.backgroundImage = "url(./img/bonitinho.jpg)";
                break;
            case 2:
                fundo.style.backgroundImage = "url(./img/sol-bonito.jpg)";
                break;
            case 3:
                fundo.style.backgroundImage = "url(./img/astronauta.webp)";
                break;
            default:
                break;
        }
    });
});

//------------ABRIR MODAL------------//
function abrirModal(diaDiv) {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('nomeEvento').value = '';
    document.getElementById('dataEvento').value = diaDiv.getAttribute('data-date');
}

document.getElementById('fecharModal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});



//------------INICIALIZA------------//
CalendarioMensal();
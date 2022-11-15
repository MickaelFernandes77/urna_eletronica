// variáveis de controle de interface
// selecionando o span do d-1-1
let tela = document.querySelector('.tela');
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-direito');
// imagem do candidato
let img = document.querySelector('.d-1-imagem');
// var que pega o campo dos numeros
let numeros = document.querySelector('.d-1-3');

// variaveis de ambiente
// var que vai servir de base para a contagem do cargo que estará sendo votado
let etapaAtual = 0;
// var que vai receber os numeros que o usuário digitar no teclado
let numero = '';
let votoBranco = true;
let votos = [];


function comecarEtapa(){
    // var etapa, recebe o array de etapas e a var etapa atual como indice.
    let etapa = etapas[etapaAtual];
    // numero vazio, sem nada na memória da variável, tanto para iniciar quanto para reiniciar o processo de voto.
    numero = '';
    votoBranco = false;

    let numeroHTML = '';
    
    // for para adicionar os campos de números para votar
    for(let i = 0; i<etapa.numeros;i++){
        if(i === 0){
            numeroHTML += '<div class="numero pisca"></div>'        
        }else{
        // toda vez que o loop passar um número, vai adicionar uma caixa de número na tela
        numeroHTML += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = 'none';
    // puxa do array, o cargo que será votado
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none'
    lateral.innerHTML = '';
    // recebe a var numeroHTML que vai adicionar o valor digitado pelo usuario no campo
    numeros.innerHTML = numeroHTML;

}

// atualiza a interface após uma alteração
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    // candidato recebe a função filter(que verifica se o item do array é igual o da condição, se for, ele aproveita o item, e o coloca em um novo array), junto a var etapa, que recebe o array com os candidatos.
    let candidato = etapa.candidatos.filter((item) =>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });

    // se o tamanho candidato for maior que 0, significa que ele achou, portanto podemos montar a estrutura na tela.
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} </br> Partido: ${candidato.partido}`
        aviso.style.display = 'block';
        img.style.display = 'block';

        // fotos do candidato
        let fotosHTML = '';
        // for para acessar o array de fotos.
        for(let i in candidato.fotos){
            fotosHTML += `<img src="img/${candidato.fotos[i].url}" class="imagem-candidato"><p>${candidato.fotos[i].legenda}</p>`
        }
        lateral.innerHTML = fotosHTML;
    } else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block'
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>'
    }

    console.log('Candidato: ', candidato);

}

// função que capta os cliques dos números
function clicou(n){
    // var que verifica se existe algum campo de numero piscando, se estiver, um numero pode ser inserido.
    let elNumero = document.querySelector('.numero.pisca');
    // se o numero que contém a propriedade pisca for diferente de nulo, adiciona o valor na var numero
    if(elNumero != null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`

        // removendo a classe pisca do campo em que um numero já foi adicionado
        elNumero.classList.remove('pisca');

        // se o proximo campo for diferente de nulo, significa que tem como inserir mais numeros.
        // e quando chegar no ultimo campo, a interface é atualizada.
        if(elNumero.nextElementSibling != null){
        // nextElementSibling: acha o próximo elemento que corresponde a um padrão
        elNumero.nextElementSibling.classList.add('pisca');
        }else{
            atualizaInterface();
        }
    }
}

// função branco
function branco(){
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block'
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso-grande-branco pisca">VOTO BRANCO</div>';
    lateral.innerHTML = '';
}
// função corrige
function corrige(){
    comecarEtapa();
}

// função confirma
function confirma(){
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true){
        // se o voto foi confirmado, como nulo, branco ou um voto valido, realiza a validação do voto pra true
        votoConfirmado = true;
        // adicionando votos na var votos
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
    }else if(numero.length === etapa.numeros){
        // se o tamanho do valor que está na var numero for igual ao valor etapa.numeros do array, significa que o usuário digitou todos os numeros para realizar a votação, sendo eles validos ou nulos.
        votoConfirmado = true;

        // adicionando os votos na var votos
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
        }

    if(votoConfirmado === true){
        // e adiciona mais um numero, a var etapa atual, para continuar a votação.
        etapaAtual++;
        // verificando se existe outra etapa na votação.
        if(etapas[etapaAtual] != undefined){
            // se existir, reinicia a etapa, como o valor da etapa incrementado.
            comecarEtapa();
        }else{
            tela.innerHTML = '<div class="aviso-fim pisca">FIM</div>'
            // para reiniciar o sistema de voto.
            comecarEtapa();
        }
    }
}

comecarEtapa();


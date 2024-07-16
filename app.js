//Jogo da memoria


// Definir os objetos com os cartões do jogo
const cardArray = 
[
    {
        name: "cheeseburger",
        img: "cheeseburger.png",
    },
    {
        name: "fries",
        img: "fries.png",
    },
    {
        name: "hotdog",
        img: "hotdog.png",
    },
    {
        name: "ice-cream",
        img: "ice-cream.png",
    },
    {
        name: "milkshake",
        img: "milkshake.png",
    },
    {
        name: "pizza",
        img: "pizza.png",
    },
    {
        name: "cheeseburger",
        img: "cheeseburger.png",
    },
    {
        name: "fries",
        img: "fries.png",
    },
    {
        name: "hotdog",
        img: "hotdog.png",
    },
    {
        name: "ice-cream",
        img: "ice-cream.png",
    },
    {
        name: "milkshake",
        img: "milkshake.png",
    },
    {
        name: "pizza",
        img: "pizza.png",
    }
];

// Embaralhar os cartões
cardArray.sort(() => Math.random() - 0.5);

console.log(cardArray);

// Selecionar o elemento de exibição da grade
const gridDisplay = document.querySelector("#grid");

// Definir caminhos para as imagens
const imgPath = "images/";
const cardBack = imgPath + "blank.png"; // Imagem da parte de trás do cartão
const cardWhite = imgPath + "white.png"; // Imagem usada para marcar cartões encontrados

// Variáveis para controle do jogo
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = []; // pontucao
let score=0;
let attempts = 0;
let pairsFound = 0;
let startTime;

// Criar o tabuleiro
function createBoard() 
{
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement("img");
        card.setAttribute("src", cardBack); // Define a imagem inicial do cartão (parte de trás)
        card.setAttribute("data-id", i); // Atribui um ID ao cartão
        card.addEventListener("click", flipCard); // Adiciona o evento de clique para virar o cartão
        gridDisplay.appendChild(card); // Adiciona o cartão ao tabuleiro
    }
    startTime = new Date(); // Registra o tempo de início do jogo
}

// Função para virar o cartão
function flipCard() 
{
    const cardId = this.getAttribute("data-id"); // Obtém o ID do cartão clicado
    this.setAttribute("src", imgPath + cardArray[cardId].img); // Mostra a imagem do cartão
    cardsChosen.push(cardArray[cardId].name); // Adiciona o nome do cartão escolhido ao array
    cardsChosenIds.push(cardId); // Adiciona o ID do cartão escolhido ao array
    //console.log(cardsChosen);

     // Se dois cartões foram escolhidos, verifica se são um par
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500); // Espera 0.5 segundos e verifica se há um par
    }
}



// Função para verificar se há um par
function checkMatch() 
{
    const cards = document.querySelectorAll("#grid img"); // Seleciona todos os cartões
    if (cardsChosenIds[0] === cardsChosenIds[1]) {
         // Se o jogador clicou no mesmo cartão duas vezes
        alert("Clicasta na mesma carta! Não pode ser!");
        cards[cardsChosenIds[0]].src = cardBack; // Vira o cartão de volta


    } else if (cardsChosen[0] === cardsChosen[1]) {
        // Se os cartões formam um par
        alert("Encontraste um PAR! Yeaayyyy");
        cards[cardsChosenIds[0]].src = cardWhite; // Marca os cartões como encontrados
        cards[cardsChosenIds[1]].src = cardWhite;
        cards[cardsChosenIds[0]].removeEventListener("click", flipCard); // Remove o evento de clique
        cards[cardsChosenIds[1]].removeEventListener("click", flipCard);
        cardsWon.push(cardsChosen); // Adiciona o par ao array de pares encontrados
       
         // Incrementa a pontuação em 10 pontos
         score += 10;
         pairsFound++;  
        


    } else {
        // Se os cartões não formam um par
        alert("Não é par... tenta outra vez");
        cards[cardsChosenIds[0]].src = cardBack; // Vira os cartões de volta
        cards[cardsChosenIds[1]].src = cardBack;
        // Penaliza o jogador em 1 ponto por cada tentativa errada
        score = Math.max(score - 1, 0);
    }

    attempts++; // Incrementa o número de tentativas
    document.getElementById("result").textContent = "Pontuação: " + score; // Atualiza a pontuação na página

    // Verifica se todos os pares foram encontrados
    if (pairsFound === cardArray.length / 2) {
        const endTime = new Date(); // Registra o tempo de fim do jogo
        const totalTime = Math.floor((endTime - startTime) / 1000); // Calcula o tempo total em segundos
        alert("Ganhaste em " + attempts + " tentativas! Extra: Ganhaste em " + attempts + " tentativas, em " + totalTime + " segundos");
        // Exibe o número de tentativas e o tempo decorrido no final do jogo
    }

      // Reseta os arrays para a próxima tentativa
    cardsChosen = [];
    cardsChosenIds = [];
   
}

// Inicializa o tabuleiro ao carregar a página
createBoard();

   


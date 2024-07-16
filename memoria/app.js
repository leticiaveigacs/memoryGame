const cardArray = [
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
    },
];

cardArray.sort(() => Math.random() - 0.5);
console.log(cardArray);

const gridDisplay = document.querySelector("#grid");
const imgPath = "images/";
const cardBack = imgPath + "blank.png";
const cardWhite = imgPath + "white.png";

let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];
let triess =1;
let timeStart;

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement("img");
        card.setAttribute("src", cardBack);
        card.setAttribute("data-id", i);
        card.addEventListener("click", flipCard);
        gridDisplay.appendChild(card);
    }
}

function flipCard() {


    if(timeStart===undefined) {
        timeStart= Date.now;
    }

    const cardId = this.getAttribute("data-id");
    this.setAttribute("src", imgPath + cardArray[cardId].img);
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    //console.log(cardsChosen);

    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const cards = document.querySelectorAll("#grid img");
    if (cardsChosenIds[0] === cardsChosenIds[1]) {
        alert("Clicasta na mesma carta! Não pode ser!");
        cards[cardsChosenIds[0]].src = cardBack;
    } else if (cardsChosen[0] === cardsChosen[1]) {
        alert("Encontraste um PAR! Yeaayyyy");
        cards[cardsChosenIds[0]].src = cardWhite;
        cards[cardsChosenIds[1]].src = cardWhite;
        cards[cardsChosenIds[0]].removeEventListener("click", flipCard);
        cards[cardsChosenIds[1]].removeEventListener("click", flipCard);
        cardsWon.push(cardsChosen);
    } else {
        alert("Não é par... tenta outra vez");
        cards[cardsChosenIds[0]].src = cardBack;
        cards[cardsChosenIds[1]].src = cardBack;
    }
    cardsChosen = [];
    cardsChosenIds = [];


    if(cardsWon.length === cardArray.length/2){
        const timeTotal = Math.floor((Date.now -timeStart)/1000);
        resultDisplay.innerHTML= "Ganhasate, fisexte em %{tentativas} tentativas em Y SEGUNDOS";
        
    } else if(cardsWon.length >0){
        resultDisplay.innerHTML= cardsWon.length;
        
    } 

    triess++;


}

createBoard();

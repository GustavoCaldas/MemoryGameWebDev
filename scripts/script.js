const FRONT = "card_front";
const BACK = "card_back";
const gameOverLayer = document.getElementById("gameOver");

function startGame(){
    initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards){

    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';

    cards.forEach(card=>{
        let cardElement = document.createElement('div');

        cardElement.id = card.id;
        cardElement.classList.add('card');
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement)
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    })
}

function createCardContent(card, cardElement){
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, cardElement){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add('icon');
        iconElement.src = "./assets/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    }else{
        cardElementFace.innerHTML = "&lt/&gt";
    }
    cardElement.appendChild(cardElementFace);
}

function flipCard(){
    if (game.setCard(this.id)){
        this.classList.add("flip");
        if (game.secondCard){
            if (game.checkMatch()){
                game.clearCards();
                if (game.checkGameOver()){
                    setTimeout(()=>{
                        gameOverLayer.style.display = "flex";
                    }, 700);
                }
            }else{
                setTimeout(()=>{
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
    
                    firstCardView.classList.remove("flip");
                    secondCardView.classList.remove("flip");
                    game.unflipCards();
                }, 1000);
            }
        }    
    }
}

function restart(){
    startGame();
    gameOverLayer.style.display = "none";

}

startGame();
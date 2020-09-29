// var game = document.getElementById('gamer');
// var rack = document.createElement('section');
// rack.setAttribute('class', 'memory-card');
// game.appendChild(rack);


const activeCards = [];
const cardDeal = ["red", "red", "green", "green", "yellow", "yellow", "blue", "blue", "violet", "violet", "lightgreen", "lightgreen"];
let cards = document.querySelectorAll(".memory-card");
cards = [...cards];
const startTime = new Date().getTime();
let activeCard = "";
const pairsLeft = cards.length / 2;
let score = 0;

const clickCard = function () {
    activeCard = this;
    if (activeCard == activeCards[0]) return;
    this.classList.add('flip');
    activeCard.classList.remove("hidden");

    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
    }
    else {
        cards.forEach(card => card.removeEventListener("click", clickCard))
        activeCards[1] = activeCard;
        setTimeout(function () {
            if (activeCards[0].className === activeCards[1].className) {
                activeCards.forEach(card => card.classList.add("off"))
                score++;
                cards = cards.filter(card => !card.classList.contains("off"));
                if (score == pairsLeft) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000
                    document.querySelector(".timer").textContent = ``;
                    document.querySelector(".memory-game").innerHTML =
                            `<div style="font-family: Lato;
                                         margin-left: auto;
                                         text-align: center;
                                         margin-right: auto;
                                         top: 300px;">
                            <br>
                            <h1><br>Congratulations! <br> Your time is exactly ${gameTime} seconds! </h1><br>
                            <br><span class="reset" style="cursor:pointer" onclick="location.reload()">
                            <a><button style = "position: absolute;
                                                width: 200px;
                                                left: 50%;
                                                border: none;
                                                transform: translateX(-50%);
                                                color: #262222;
                                                background: none;
                                                font-family: Lato;
                                                top: 350px;
                                                font-size: 25px;
                                                text-transform: uppercase;
                                                cursor: pointer;
                                                font-weight: 300;
                                                transition: background-color 0.3s, color 0.3s;">
                                                Click me to play again</button></a></span></div>`;
                }
            }
            else {
                activeCards.forEach(card => card.classList.add("hidden"))
            }
            activeCard = "";
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener("click", clickCard))

        }, 500)
    }
};

const prepareCards = function () {

    cards.forEach(card => {
        const position = Math.floor(Math.random() * cardDeal.length);
        card.classList.add(cardDeal[position]);
        cardDeal.splice(position, 1);
    })

    setTimeout(function () {
        cards.forEach(card => {
            card.classList.add("hidden")
            card.addEventListener("click", clickCard)
        })
    }, 2000)
};

prepareCards()


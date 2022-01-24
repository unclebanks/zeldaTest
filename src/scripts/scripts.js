const root = document.querySelector(".container");
const spriteRenderer = document.querySelector(".sprite-renderer");
const spriteView = document.querySelector(".sprite-view-frame");
const farmBox = document.getElementById('farmBox');
const dungeonBox = document.getElementById('dungeonBox');
const labBox = document.getElementById('labBox');
const nurseryBox = document.getElementById('nurseryBox');
const newGameContainer = document.getElementById('newGameContainer');

let spriteTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--sprite-top"));
let spriteLeft = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--sprite-left"));
let spriteDirection = "down";
let Player = {
    name:"",
    pokemon: [],
    pokeballs: {
        pokeballs: 0,
        greatballs: 0,
        ultraballs: 0,
        masterballs: 0
    },
    currency: {
        pokecoins:0,
        testcoin1: 0,
        testcoin2: 0,
        testcoins3: 0
    },
    berries: {
        berry1: 0,
        berry2: 0,
        berry3: 0
    },
    settings: {},
    newGame: true
}
let Game = {
    currentPage: "mainContainer"
}

function checkSave() {
    if(!localStorage.getItem("idleMon")) {
        newGame();
    } else { loadGame(); }
}

function newGame() {
    console.log(Player);
    newGameContainer.style.display = "block";
}
function startGame() {
    Player.name = document.getElementById("newGamePlayerName").value;
    Player.pokemon[0] = findPokemonByName(document.getElementById("playerFirstPokemon").value);
    Player.newGame = false;
    console.log(Player);
    localStorage.setItem("idleMon", JSON.stringify(Player));
    window.location.reload();
}

function loadGame() {
    newGameContainer.style.display = "none";
    farmBox.style.display = "block";
    dungeonBox.style.display = "block";
    labBox.style.display = "block";
    nurseryBox.style.display = "block";
    spriteView.style.display = "block";
    Player = JSON.parse(localStorage.getItem("idleMon"));
}

function changeNGPage(pageFrom, pageTo, pageStyle) {
    if (pageTo === "newGamePage3" && document.getElementById("newGamePlayerName").value == '') {
        alert("Please enter a value for your name.");
        return
    }
    document.getElementById(pageFrom).style.display = "none";
    document.getElementById(pageTo).style.display = pageStyle;
}

function checkCollision(spriteLocation) {
    let mainContainer = document.getElementById(Game.currentPage);
    if (mainContainer.hasChildNodes) {
        let childNodes = 0;
        while (childNodes < mainContainer.children.length) {
            if (mainContainer.children[childNodes].style.display != "none" && mainContainer.children[childNodes].id != "spriteFrame") {
                let iteratedBox = mainContainer.children[childNodes];
                if (collisionLogic(iteratedBox.getBoundingClientRect(), spriteLocation) === true) {
                    console.log(iteratedBox.id);
                    loadBox(iteratedBox.id);
                }
            }
            childNodes++;
        }
    }
}
function collisionLogic(areaToCheck, spriteLocation) {
    let spriteXAxis = spriteLocation.x + spriteLocation.width;
    let spriteYAxis = spriteLocation.y + spriteLocation.height;
    let elementXAxis = areaToCheck.x + areaToCheck.width;
    let elementYAxis = areaToCheck.y + areaToCheck.height;
    if (spriteLocation.x >= areaToCheck.x && spriteLocation.x <= elementXAxis && spriteLocation.y >= areaToCheck.y && spriteLocation.y <= elementYAxis || spriteXAxis >= areaToCheck.x && spriteXAxis <= elementXAxis && spriteYAxis >= areaToCheck.y && spriteYAxis <= elementYAxis) {
        spriteTop = 80;
        spriteLeft = 50;
        return true;
    } else { return false }
}
function loadBox(packageToLoad) {
    farmBox.style.display = "none";
    dungeonBox.style.display = "none";
    labBox.style.display = "none";
    nurseryBox.style.display = "none";
    switch(packageToLoad) {
        case "labBox": { document.getElementById('labInternal').style.display = "block"; Game.currentPage = "labInternal"; }
        break;
        case "nurseryBox": { document.getElementById('nurseryInternal').style.display = "block"; Game.currentPage = "nurseryInternal"; }
        break;
        default: return;
    }
}

document.addEventListener("keydown", (e) => {
    if(!["w", "a", "s", "d"].includes(e.key) || Player.newGame === true) return;
    checkCollision(spriteRenderer.getBoundingClientRect());
    switch (e.key) {
        case "w":
            if (spriteDirection != "up") {
                spriteDirection = "up";
            };
            if (spriteTop > 0) {
                spriteTop -= 1
            };
            if (spriteTop === 0) {
                alert(Game.currentPage);
            }
            break;
        case "s":
            if (spriteDirection != "down") {
                spriteDirection = "down";
            }
            if (spriteTop < 100) {
                spriteTop +=1;
            }
            break;
        case "a":
            if (spriteDirection != "left") {
                spriteDirection = "left";
            }
            if (spriteLeft > 0) {
                spriteLeft -= 1
            };
            break;
        case "d":
            if (spriteDirection != "right") {
                spriteDirection = "right";
            }
            if (spriteLeft < 100) {
                spriteLeft +=1;
            }
            break;
        default:
            break;
    }
    root.style.setProperty(
        "--sprite-sheet-url",
        `url(../images/link-spritesheet-${spriteDirection}.png)`
    );
    spriteRenderer.classList.add("animating");
    spriteView.style.setProperty("top", `${spriteTop}%`);
    spriteView.style.setProperty("left", `${spriteLeft}%`);

} );
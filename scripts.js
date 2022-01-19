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
    settings: {}
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

function loadGame() {
    newGameContainer = "none";
    farmBox.style.display = "block";
    dungeonBox.style.display = "block";
    labBox.style.display = "block";
    nurseryBox.style.display = "block";
    spriteView.style.display = "block";

}

function changeNGPage(pageFrom, pageTo, pageStyle) {
    document.getElementById(pageFrom).style.display = "none";
    document.getElementById(pageTo).style.display = pageStyle;
}

function checkCollision(spriteLocation) {
    let dungeonBound = dungeonBox.getBoundingClientRect();
    let labBound = labBox.getBoundingClientRect();
    let nurseryBound = nurseryBox.getBoundingClientRect();
    let farmBound = farmBox.getBoundingClientRect();
    if(collisionLogic(dungeonBound, spriteLocation) === true) {
        alert("dungeonBox");
    } else if(collisionLogic(labBound, spriteLocation) === true) {
        loadLab();
    } else if(collisionLogic(nurseryBound, spriteLocation) === true) {
        alert("nursery")
    } else if(collisionLogic(farmBound, spriteLocation) === true) {
        alert("farm")
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
function loadLab() {
    farmBox.style.display = "none";
    dungeonBox.style.display = "none";
    labBox.style.display = "none";
    nurseryBox.style.display = "none";
    document.getElementById('labInternal').style.display = "block";
}

document.addEventListener("keydown", (e) => {
    if(!["w", "a", "s", "d"].includes(e.key)) return;
    checkCollision(spriteRenderer.getBoundingClientRect());
    switch (e.key) {
        case "w":
            if (spriteDirection != "up") {
                spriteDirection = "up";
            };
            if (spriteTop > 0) {
                spriteTop -= 1
            };
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
            if (spriteTop < 100) {
                spriteTop +=1;
            }
            break;
        default:
            break;
    }
    root.style.setProperty(
        "--sprite-sheet-url",
        `url(./link-spritesheet-${spriteDirection}.png)`
    );
    spriteRenderer.classList.add("animating");
    spriteView.style.setProperty("top", `${spriteTop}%`);
    spriteView.style.setProperty("left", `${spriteLeft}%`);

} );
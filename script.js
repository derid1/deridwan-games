let players = [];

let currentPlayer = 0;

let playerNumbers = [];

/* START */

function showPlayerSetup(){

  document.getElementById("bgMusic")
  .play();

  document.getElementById("startScreen")
  .classList.add("hidden");

  document.getElementById("playerSetup")
  .classList.remove("hidden");
}


/* ADD PLAYER */

function addPlayer(){

  let input =
  document.getElementById("playerInput");

  let name = input.value.trim();

  if(name === ""){

    alert("Masukkan nama");
    return;
  }

  players.push(name);

  input.value = "";

  showPlayers();

  if(players.length >= 2){

    document.getElementById("beginBtn")
    .classList.remove("hidden");
  }
}

/* SHOW PLAYERS */

function showPlayers(){

  let list =
  document.getElementById("playerList");

  list.innerHTML = "";

  players.forEach((player,index)=>{

    list.innerHTML += `
    
    <div class="playerName">

      0${index+1} - ${player}

    </div>
    
    `;
  });
}

/* START GAME */

function startGame(){

  currentPlayer = 0;

  playerNumbers = [];

  document.getElementById("playerSetup")
  .classList.add("hidden");

  document.getElementById("gameScreen")
  .classList.remove("hidden");

  showTurn();
}

/* SHOW TURN */

function showTurn(){

  document.getElementById("turnText")
  .innerText =
  `${players[currentPlayer]} PILIH ANGKA`;

  document.getElementById("numberInput")
  .value = "";
}

/* SUBMIT */

function submitNumber(){

  let value =
  Number(document.getElementById("numberInput").value);

  if(isNaN(value)){

    alert("Masukkan angka");
    return;
  }

  if(value < 0 || value > 100){

    alert("Angka harus 0 - 100");
    return;
  }

  playerNumbers.push({

    name: players[currentPlayer],

    number: value
  });

  currentPlayer++;

  if(currentPlayer < players.length){

    showTurn();

  }else{

    showResult();
  }
}

/* RESULT */

function showResult(){

  document.getElementById("gameScreen")
  .classList.add("hidden");

  document.getElementById("resultScreen")
  .classList.remove("hidden");

  setTimeout(function(){

    calculateWinner();

  },3000);
}

/* CALCULATE */

function calculateWinner(){

  let total = 0;

  playerNumbers.forEach(player=>{

    total += player.number;
  });

  let average =
  total / playerNumbers.length;

  let target =
  average * 0.8;

  let winner = playerNumbers[0];

  let closest =
  Math.abs(playerNumbers[0].number - target);

  playerNumbers.forEach(player=>{

    let distance =
    Math.abs(player.number - target);

    if(distance < closest){

      closest = distance;

      winner = player;
    }
  });

  /* HTML RESULT */

  let html = `

  <div class="resultContainer">

  `;

  playerNumbers.forEach(player=>{

    let winnerClass = "";

    if(player.name === winner.name){

      winnerClass = "winner";
    }

    html += `

    <div class="playerCard ${winnerClass}">

      <h3>${player.name}</h3>

      <p>${player.number}</p>

    </div>

    `;
  });

  html += `
  
  </div>

  <h2>RATA-RATA : ${average.toFixed(2)}</h2>

  <h2>TARGET x0.8 : ${target.toFixed(2)}</h2>

  <h1>PEMENANG : ${winner.name}</h1>

  <button onclick="restartGame()">

    MAIN LAGI

  </button>
  
  `;

  document.getElementById("finalResult")
  .innerHTML = html;
}

/* RESTART */

function restartGame(){

  currentPlayer = 0;

  playerNumbers = [];

  document.getElementById("resultScreen")
  .classList.add("hidden");

  document.getElementById("gameScreen")
  .classList.remove("hidden");

  showTurn();
}
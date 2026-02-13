let teams = [];
let currentTeam = 0;
let teamTotal = 1;
let round = 1;
let realValue = 0;

function startGame() {
  teamTotal = parseInt(document.getElementById("teamCount").value);
  teams = [];

  for (let i = 1; i <= teamTotal; i++) {
    teams.push({ name: "Équipe " + i, score: 0 });
  }

  document.getElementById("setupScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");

  nextRound();
}

function nextRound() {
  document.getElementById("roundInfo").innerHTML =
    "<strong>Tour " + round + "</strong><br>Au tour de " + teams[currentTeam].name;

  if (round === 1) {
    realValue = prompt("Juge : entrez taille réelle (cm)");
  } else if (round === 2) {
    realValue = prompt("Juge : entrez poids réel (g)");
  } else if (round === 3) {
    realValue = (Math.random() * 30 + 10).toFixed(1);
    alert("Trouvez un objet de " + realValue + " cm");
  } else if (round === 4) {
    realValue = Math.floor(Math.random() * 900 + 100);
    alert("Trouvez un objet de " + realValue + " g");
  } else {
    endGame();
  }
}

function validate() {
  let userAnswer = parseFloat(document.getElementById("answer").value);
  let difference = Math.abs(userAnswer - realValue);
  let points = 0;

  if (difference === 0) points = 5;
  else if (difference <= 1) points = 3;
  else if (difference <= 5) points = 1;

  teams[currentTeam].score += points;

  document.getElementById("result").innerHTML =
    "Valeur cible : " + realValue + "<br>Points gagnés : " + points;

  updateScoreBoard();
}

function nextTurn() {
  currentTeam++;

  if (currentTeam >= teamTotal) {
    currentTeam = 0;
    round++;
  }

  nextRound();
}

function updateScoreBoard() {
  let board = "<h3>Classement</h3>";
  teams.forEach(team => {
    board += team.name + " : " + team.score + " pts<br>";
  });
  document.getElementById("scoreBoard").innerHTML = board;
}

function endGame() {
  teams.sort((a,b)=>b.score-a.score);
  alert("🏆 Victoire : " + teams[0].name);
  location.reload();
}

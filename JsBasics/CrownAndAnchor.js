{
function randNum(m, n) {
  return m + Math.floor((n-m)*Math.random());
}
function randFace() {
  let face = ["crown", "anchor", "heart", "club", "spade", "diamond"];
  return face[randNum(0,5)];
}

let funds = 50;
console.log(funds);

while(funds > 0 || funds < 100) {
  console.log(funds);
  console.log('Start to Bet');
  let bet = {crown:0, anchor:0, heart:0, club:0, spade:0, diamond:0};
  let totalBets = randNum(1, funds);
  if(totalBets === 7) {
    bet.heart = totalBets;
  } else {
    while(totalBets > 0) {
      let face = randFace();
      let oneBet = randNum(1, totalBets);
      bet[face] = bet[face] + oneBet;
      totalBets = totalBets - oneBet;
    }
  }
  funds = funds - totalBets;
  //console.log('Betted ${totalBets}');
  let hands = [];
  for(let i = 0; i < 3; i++) {
    hands.push(randFace());
  }
  //console.log('start to collect money');
  let winning = 0;
  for(let f of hands) {
    winning = winning + bet[f];
  }
  funds = funds + winning;
  console.log(funds);
}
console.log('game ends...got:${funds}');
}

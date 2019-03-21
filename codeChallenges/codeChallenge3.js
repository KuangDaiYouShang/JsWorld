var tipCalculator = function(cost) {
  if(cost < 50) {
    return cost*0.2;
  } else if(cost > 50 && cost < 200) {
    return cost*0.15;
  } else {
    return cost*0.2;
  }
}

var costs = [124, 48, 264];
var tips = [tipCalculator(costs[0]), tipCalculator(costs[1]), tipCalculator(costs[2])];
var finalValues = [costs[0] + tips[0], costs[1]+tips[1], costs[2] + tips[2]];
console.log(tips);
console.log(finalValues);

var tipCalculator = {
  costs: [],
  tips: [],
  calculate: function(){
    for(var i = 0; i < this.costs.length; i++) {
      if(this.costs[i] <= 50 ) {
        this.tips.push(this.costs[i]*0.2);
      } else if(this.costs[i] > 50 && costs[i] < 200) {
        this.tips.push(costs[i]*0.2);
      } else {
        this.tips.push(this.costs[i]*0.15);
      }
    }
  },
  getAvgTips: function(){
    var sum = 0;
    for(var i = 0; i < this.tips.length; i++) {
        sum += this.tips[i];
    }
    return sum/this.tips.length;
  }
}

costs = [124, 48, 268, 180, 42];
tipCalculator.costs=costs;
tipCalculator.calculate();
console.log(tipCalculator.tips);
console.log(tipCalculator.getAvgTips());

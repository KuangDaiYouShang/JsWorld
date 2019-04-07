
(function() {
  var Question = function(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  }

  var question_1 = new Question('When did you met her?',
  ['2009/10/24', '2010/10/24', '2016/10/14'], 0);

  var question_2 = new Question('Do you still love her?',
  ['Yes', 'No'], 0)

  var questions = [question_1, question_2];

  Question.prototype.displayScore = function(callBack) {
    score = callBack(true);
    console.log('Your current score is ' + score);
    console.log('=====================================');
  }

  //Important: To optimize the code in the future, u should distribute this into several functions.
  Question.prototype.selectQuestion = function(questions, tryAgain) {
    var sc;
    var random = Math.floor(Math.random()*questions.length);
    var quizInfo = questions[random];
    //prompt create a dialog and store the user`s input value.
    var userInput = prompt(quizInfo.question);
    //Use bind to create the copy of selectQuestion with predefined arguments.
    var selectAgain = this.selectQuestion.bind(this, questions, random);
    for(var i = 0; i < quizInfo.answers.length; i++) {
      console.log(i+1 +'. ' + quizInfo.answers[i]);
    }
    if(userInput == quizInfo.answers[quizInfo.correct]) {
      console.log('right answer!');
      this.displayScore(keepScore);
      this.selectQuestion(questions); //this refers to Question
    } else if (userInput == 'exit') {
      return;
    } else {
      console.log('Wrong! plz try again!');
      selectAgain();
    }
  }

  //function to modify the score. Using closure and score is still an accessable variables
  //even after doScore returned.
  function doScore() {
    var sc = 0;
    return function(correct) {
      if(correct) {
        sc++;
      }
      return sc;
    }
  }
  var keepScore = doScore();

  var main = new Question();
  main.selectQuestion(questions);
})();

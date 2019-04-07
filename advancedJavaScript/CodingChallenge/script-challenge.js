
/*
1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)
2. Create a couple of questions using the constructor
3. Store them all inside an array
4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).
5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.
6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)
8. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.
9. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).
10. Display the score in the console. Use yet another method for this.

Suppose this code would be a plugin for other programmers to use in their code.
So make sure that all your code is private and doesn't interfere with the other programmers code - IIFE
*/
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

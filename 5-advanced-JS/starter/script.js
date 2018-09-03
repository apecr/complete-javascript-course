/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

(_ => {
  let questionNumber = 0;
  let userAnswer = 0;
  while (true) {
    const Question = function({question, answers, correctAnswer}) {
      this.question = question;
      this.answers = answers;
      this.correctAnswer = correctAnswer;
      this.logQuestionsAndAnswers = function() {
        console.log(this.question);
        this.answers.forEach((answer, index) => console.log(`${index}: ${answer}`));
      };
      this.isAnswerCorrect = function(ans) {
        console.log(ans == this.correctAnswer
          ? 'Correct answer!'
          : 'Wrong answer');
      };
    };

    const questions = [
      new Question({
        question: 'Who is the best football player?',
        answers: [
          'Luka Modrick',
          'Kolarov',
          'Koke'
        ],
        correctAnswer: 0
      }),
      new Question({
        question: 'What is the best language?',
        answers: [
          'English',
          'Spanish',
          'French'
        ],
        correctAnswer: 1
      }),
      new Question({
        question: 'What is the best browser?',
        answers: [
          'Firefox',
          'Internet Explorer',
          'Chrome'
        ],
        correctAnswer: 2
      })
    ];

    questionNumber = Math.floor(Math.random() * questions.length);
    console.log();
    questions[questionNumber].logQuestionsAndAnswers();

    userAnswer = prompt('Please select the correct answer (just type the number). Or type exit to quit.');
    if (userAnswer === 'exit' || userAnswer === 'quit') {
      return;
    }
    questions[questionNumber].isAnswerCorrect(userAnswer);
  }
})();



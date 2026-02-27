import { Component} from '@angular/core';

//an interface forces the object to follow a specific structure
interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

//in angular component decorator is immediately followed by the class it belongs to
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App {
  //define  the three state variables
  // : below is type annotation (defining what all the variable currentStep can be)
  //pipe creates a union type 
  currentStep : 'start' | 'quiz' | 'results' = 'start';

  //track the questions
  currentQuestion = 0;
  score = 0;

  //a typed array
  questions: Question[] = [
    {
      text: "Which HTML5 element is used to specify a footer for a document or section?",
      options: ["<bottom>", "<footer>", "<end>", "<section-footer>"],
      correctAnswer: 1
    },
    {
      text: "What does the defer attribute do in a <script> tag?",
      options: ["It stops the HTML parsing immediately", "It executes the script only after the document has been fully parsed", "It makes the script load faster by compressing it", "It prevents the script from running on mobile devices"],
      correctAnswer: 1
    },
    {
      text: "What does CSS stand for?",
      options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
      correctAnswer: 1
    },
    {
      text: "What is the output of typeof null in Javascript?",
      options: ["null", "undefined", "object", "number"],
      correctAnswer: 2
    },
    {
      text: "Which method is used to add one or more elements to the end of an array and returns the new length?",
      options: [".pop()", ".shift()", ".push()", ".unshift()"],
      correctAnswer: 2
    }
  ];

  //function to start quiz
  startQuiz() {
    this.currentStep = 'quiz';
    //to ensure current question and score are always 0 when quiz starts
    this.currentQuestion = 0;
    this.score = 0;
  }

  //handle answer
  handleAnswer(optionIndex: number) {
    //if correct
    if (optionIndex === this.questions[this.currentQuestion].correctAnswer) {
      this.score++;
    }

    //move to next question or show result if all questions are over
    if(this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
    } else {
      this.currentStep = 'results';
    }
  }

}

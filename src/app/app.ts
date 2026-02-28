import { Component, ChangeDetectorRef } from '@angular/core';

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
  // : below is type annotation (defining what all the variable can be)
  //pipe creates a union type 
  currentStep : 'start' | 'quiz' | 'results' = 'start';

  //track the questions
  currentQuestion = 0;
  score = 0;

  //timer variables
  timeLeft = 60;
  timerInterval: any;

  // Add constructor to use Change Detection manually if needed
  constructor(private cdr: ChangeDetectorRef) {}

  //correct or wrong answers
  isAnswered = false;
  selectedOption: number | null = null;

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
    this.startTimer();
  }

  //handle answer
  handleAnswer(optionIndex: number) {
    //check if answer is clicked
    if (this.isAnswered) return;
    
    this.isAnswered = true;
    this.selectedOption = optionIndex;
    clearInterval(this.timerInterval); //stop the timer

    //if correct
    if (optionIndex === this.questions[this.currentQuestion].correctAnswer) {
      this.score++;
    }
    //wait for user to see the feedback then move on to next question
    setTimeout(() => {
      this.goToNextQuestion();
    }, 1500);
  }

  startTimer(){
    this.timeLeft = 60;
    clearInterval(this.timerInterval);

    this.timerInterval = setInterval(()=> {
      if (this.timeLeft > 0){
        this.timeLeft--;
        this.cdr.detectChanges();
      } else {
        this.goToNextQuestion();
      }
    }, 1000);
  }

  goToNextQuestion(){
    // Reset the feedback state for the new question
    this.isAnswered = false;
    this.selectedOption = null;

    clearInterval(this.timerInterval);
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
      this.timeLeft = 60;
      this.startTimer();
      this.cdr.detectChanges(); // Refresh UI for new question
    } else {
      this.currentStep = 'results';
      this.cdr.detectChanges();
    }
  }

}

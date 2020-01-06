import React, { Component } from 'react';
import produce from 'immer';
import { Question } from './Question';
import { loadQuestions } from '../utils/questionHelper';
import { HUD } from './HUD';

export type fetchedQuestion = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionType = {
  answer: number | null;
  answerChoices: string[];
  question: string;
};

interface GameProps {}

interface GameState {
  questions: QuestionType[] | null;
  currentQuestion: QuestionType | null;
  loading: boolean;
  score: number;
  questionNumber: number;
}

export default class Game extends Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);

    this.state = {
      questions: null,
      currentQuestion: null,
      loading: true,
      score: 0,
      questionNumber: 0,
    };
  }

  async componentDidMount(): Promise<void> {
    try {
      const questions = await loadQuestions();
      console.log('TCL: Game -> questions', questions);
      this.setState(
        {
          questions,
        },
        () => {
          this.changeQuestion();
        }
      );
    } catch (err) {
      console.error(err);
    }
    console.log('this.state.questions: ', this.state.questions);
  }

  changeQuestion = (bonus = 0): void => {
    if (this.state.questions) {
      const randomQuestionIndex = Math.floor(
        Math.random() * this.state.questions.length
      );
      // randomly get a question
      const currentQuestion = this.state.questions[randomQuestionIndex];
      // copy questions array
      const remainingQuestions = [...this.state.questions];
      // remove currentQuestion from remaining questions
      remainingQuestions.splice(randomQuestionIndex, 1);
      // set remaining questions to state
      console.log('remainingQuestions: ', remainingQuestions);

      this.setState(
        produce(draft => {
          draft.questions = remainingQuestions;
          draft.currentQuestion = currentQuestion;
          draft.loading = false;
          draft.score = draft.score += bonus;
          draft.questionNumber = draft.questionNumber + 1;
        })
      );
      console.log('Score: ', this.state.score);
    }
  };

  render(): JSX.Element {
    return (
      <>
        {this.state.loading && <div id="loader" />}
        {!this.state.loading && this.state.currentQuestion && (
          <>
            <HUD
              score={this.state.score}
              questionNumber={this.state.questionNumber}
            />
            <Question
              changeQuestion={this.changeQuestion}
              question={this.state.currentQuestion}
            />
          </>
        )}
      </>
    );
  }
}

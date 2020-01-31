import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import produce from 'immer';
import { Question } from './Question';
import { loadQuestions } from '../utils/questionHelper';
import { HUD } from './HUD';
import { SaveScoreForm } from './SaveScoreForm';

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

interface GameProps extends RouteComponentProps<any> {}

interface GameState {
  questions: QuestionType[] | null;
  currentQuestion: QuestionType | null;
  loading: boolean;
  score: number;
  questionNumber: number;
  done: boolean;
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
      done: false,
    };
  }

  async componentDidMount(): Promise<void> {
    try {
      const questions = await loadQuestions();
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
  }

  changeQuestion = (bonus = 0): void => {
    if (this.state.questions && this.state.questions.length === 0) {
      return this.setState(
        produce(draft => {
          draft.score += bonus;
          draft.done = true;
        })
      );
    }
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

      this.setState(
        produce(draft => {
          draft.questions = remainingQuestions;
          draft.currentQuestion = currentQuestion;
          draft.loading = false;
          draft.score = draft.score += bonus;
          draft.questionNumber += 1;
        })
      );
    }
  };

  scoreSaved = (): void => {
    this.props.history.push('/');
  };

  render(): JSX.Element {
    const {
      loading,
      done,
      score,
      currentQuestion,
      questionNumber,
    } = this.state;
    return (
      <>
        {loading && !done && <div id="loader" />}
        {!done && !loading && currentQuestion && (
          <>
            <HUD score={score} questionNumber={questionNumber} />
            <Question
              changeQuestion={this.changeQuestion}
              question={currentQuestion}
            />
          </>
        )}
        {done && <SaveScoreForm score={score} scoreSaved={this.scoreSaved} />}
      </>
    );
  }
}

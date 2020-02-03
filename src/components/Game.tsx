import React, { useEffect, useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useImmer } from 'use-immer';
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

const Game: React.FC<GameProps> = ({ history }: GameProps) => {
  const [questions, setQuestions] = useState<QuestionType[] | null>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [score, updateScore] = useImmer({ value: 0 });
  const [questionNumber, updateQuestionNumber] = useImmer({ value: 0 });

  useEffect(() => {
    loadQuestions()
      .then(questions => setQuestions(questions))
      .catch(err => console.error(err));
  }, []);

  const changeQuestion = useCallback(
    (bonus = 0): void => {
      if (questions && questions.length === 0) {
        setDone(true);
        return updateScore(draft => {
          draft.value += bonus;
        });
      }
      if (questions) {
        const randomQuestionIndex = Math.floor(
          Math.random() * questions.length
        );
        // randomly get a question
        const currentQuestion = questions[randomQuestionIndex];
        // copy questions array
        const remainingQuestions = [...questions];
        // remove currentQuestion from remaining questions
        remainingQuestions.splice(randomQuestionIndex, 1);
        // set remaining questions to state

        setQuestions(remainingQuestions);
        setCurrentQuestion(currentQuestion);
        setLoading(false);
        updateScore(draft => {
          draft.value += bonus;
        });
        updateQuestionNumber(draft => {
          draft.value += 1;
        });
      }
    },
    [
      questions,
      updateScore,
      setQuestions,
      setLoading,
      setCurrentQuestion,
      updateQuestionNumber,
    ]
  );

  useEffect(() => {
    if (questions && questions.length && !currentQuestion) {
      changeQuestion();
    }
  }, [changeQuestion, questions, currentQuestion]);

  const scoreSaved = (): void => {
    history.push('/');
  };

  return (
    <>
      {loading && !done && <div id="loader" />}
      {!done && !loading && currentQuestion && (
        <>
          <HUD score={score.value} questionNumber={questionNumber.value} />
          <Question
            changeQuestion={changeQuestion}
            question={currentQuestion}
          />
        </>
      )}
      {done && <SaveScoreForm score={score.value} scoreSaved={scoreSaved} />}
    </>
  );
};

export default Game;

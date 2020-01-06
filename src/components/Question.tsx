import * as React from 'react';
import { QuestionType } from './Game';

interface QuestionProps {
  question: QuestionType;
  changeQuestion: (bonus: number) => void;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  changeQuestion,
}: QuestionProps) => {
  const [classToApply, setClassToApply] = React.useState('');
  const [selectedAnswer, setSelectedAnswer] = React.useState(-1);
  const [answering, setAnswering] = React.useState(false);

  const checkAnswer = (selectedAnswer: number): void => {
    if (answering) {
      return;
    }

    setAnswering(true);
    setSelectedAnswer(selectedAnswer);

    const classToApply =
      selectedAnswer === question.answer ? 'correct' : 'incorrect';
    setClassToApply(classToApply);
    const bonus = selectedAnswer === question.answer ? 10 : 0;

    setTimeout(() => {
      setSelectedAnswer(-1);
      setAnswering(false);
      changeQuestion(bonus);
    }, 1000);
  };

  if (question) {
    return (
      <div>
        <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
        {question.answerChoices.map((choice, index) => (
          <div
            className={`choice-container ${selectedAnswer === index &&
              classToApply}`}
            key={index}
            onClick={(): void => checkAnswer(index)}
          >
            <p className="choice-prefix">{index + 1}</p>
            <p
              className="choice-text"
              dangerouslySetInnerHTML={{ __html: choice }}
            />
          </div>
        ))}
      </div>
    );
  }

  return <h3>No question found</h3>;
};

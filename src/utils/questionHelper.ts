import { QuestionType, fetchedQuestion } from '../components/Game';

const convertQuestionsFromAPI = (
  rawQuestions: fetchedQuestion[]
): QuestionType[] => {
  return rawQuestions.map((loadedQuestion: fetchedQuestion) => {
    const formattedQuestion: QuestionType = {
      question: loadedQuestion.question,
      answerChoices: [...loadedQuestion.incorrect_answers],
      answer: null,
    };

    formattedQuestion.answer = Math.floor(Math.random() * 4);
    formattedQuestion.answerChoices.splice(
      formattedQuestion.answer,
      0,
      loadedQuestion.correct_answer
    );

    return formattedQuestion;
  });
};

export const loadQuestions = async (
  amount = 10,
  category = 9,
  difficulty = 'easy',
  type = 'multiple'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

  try {
    const res = await fetch(url);
    const { results } = await res.json();
    return convertQuestionsFromAPI(results);
  } catch (err) {
    console.error(err);
  }
};

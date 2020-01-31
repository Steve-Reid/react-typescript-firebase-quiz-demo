import * as React from 'react';
import { useFirebase } from '../firebase/firebaseContext';

interface HighScoresProps {}

export const HighScores: React.FC<HighScoresProps> = () => {
  const firebase = useFirebase();
  const [scores, setScores] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const formatScoreData = (firebaseScores: any): any[] => {
      const scores = [];

      for (const key in firebaseScores) {
        const val = firebaseScores[key];
        val['key'] = key;
        scores.push(val);
      }

      return scores
        .sort((score1, score2) => score2.score - score1.score)
        .slice(0, 10);
    };

    firebase.scores().once('value', (snapshot: any) => {
      const data = snapshot.val();
      const sortedScores = formatScoreData(data);
      setScores(sortedScores);
      setLoading(false);
    });
  });

  return (
    <>
      {loading && <div id="loader" />}
      {!loading && (
        <>
          <h1>High Scores</h1>
          <div id="highScoresList">
            {scores.map(record => (
              <li key={record.key} className="high-score">
                {record.name} - {record.score}
              </li>
            ))}
          </div>
        </>
      )}
    </>
  );
};

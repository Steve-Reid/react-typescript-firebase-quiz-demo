import * as app from 'firebase/app';
// Import the other firebase modules for their SIDE-EFFECTS! These imports will augment
// the App module and provide the type-definition for the .database() method.
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }

  scores = (): app.database.Reference => app.database().ref('scores');
}

export default Firebase;

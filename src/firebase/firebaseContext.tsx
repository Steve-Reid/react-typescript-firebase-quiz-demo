import * as React from 'react';

export const FirebaseContext = React.createContext<any | null>(null);
export const useFirebase = (): null => React.useContext(FirebaseContext);

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../server/firebase';

const AuthContext = createContext();

export function UseAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const value = { user, isLoading };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      console.log(value);
      setUser(user);
      setIsLoading(false);
    });
    return unsubscribed();
  }, []);

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
}

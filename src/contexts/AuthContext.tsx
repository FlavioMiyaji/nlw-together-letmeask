import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { auth, firebase } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  singInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

type Props = {
  children: ReactNode;
};

function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        return;
      }
      const { displayName, photoURL, uid } = user;
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    });
    return () => unsubscribe();
  }, []);

  const singInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    if (!result.user) {
      return;
    }
    const { displayName, photoURL, uid } = result.user;
    if (!displayName || !photoURL) {
      throw new Error('Missing information from Google Account.');
    }

    setUser({
      id: uid,
      name: displayName,
      avatar: photoURL,
    });
  };
  return (
    <AuthContext.Provider value={{ user, singInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthContext,
  AuthContextProvider,
};

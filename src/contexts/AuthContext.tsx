import React, {
  createContext,
  ReactNode,
  useCallback,
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

  const changeUser = useCallback((user: firebase.User | null) => {
    if (!user) return;
    const { uid: id, displayName: name, photoURL: avatar } = user;
    if (!name || !avatar) {
      throw new Error('Missing information from Google Account.');
    }
    setUser({ id, name, avatar });
  }, [setUser]);

  const singInWithGoogle = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    if (result) changeUser(result.user);
  }, [changeUser]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => changeUser(user));
    return () => unsubscribe();
  }, [changeUser]);
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

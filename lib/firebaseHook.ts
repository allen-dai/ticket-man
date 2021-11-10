import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect, createContext, useContext } from "react";


type userProps ={
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
}

type valueProps = {
  loading: boolean;
  user: any;
  sign_out: Function;
};


//Context
export const UserContext = createContext<any>(null);

export function useUserContext() {
  return useContext(UserContext);
}

//Hook
export function useUserData() {
  const [user, setUser] = useState<userProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
            uid:user.uid,
            email:user.email as string,
            photoURL:user.photoURL as string,
            displayName:user.displayName as string,
            });
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  },[]);

  function sign_out() {
    signOut(auth);
  }

  const value: valueProps = {
    loading,
    user,
    sign_out,
  };

  return value;
}

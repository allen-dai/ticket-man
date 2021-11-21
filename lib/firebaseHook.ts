import { auth } from "./firebase";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { useState, useEffect, createContext, useContext } from "react";


type userProps = {
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

  const update_user = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email as string,
          photoURL: user.photoURL as string,
          displayName: user.displayName as string,
        });
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }

  useEffect(() => {
    update_user();
  }, []);

  function sign_out() {
    signOut(auth);
  }

  function update_profile(username: string) {
    //@ts-ignore
    updateProfile(auth.currentUser, {
      displayName: username
    })
      .then(() => {
        update_user();
      })
      .catch(err => {
        console.log(err);
      });

  }

  const value = {
    loading,
    user,
    sign_out,
    update_profile,
  };

  return value;
}

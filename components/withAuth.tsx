import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "../lib/firebaseHook";

//DO NOT write HOC = (WrappedComponent) = (props) => {}  Typescript will complain

const WithAuth = (WrappedComponent: React.FC) => {
  const Component = (props: React.Attributes) => {
    const router = useRouter();
    const { user, loading } = useUserContext();
    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [user, loading]);

    return user ? <WrappedComponent {...props} /> : <></>;
  };

  return Component;
};

export default WithAuth;

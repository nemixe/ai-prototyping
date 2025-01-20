import { createContext, useContext } from "react";
import { TLoginOidcParam } from "@/api/auth/type";
import { TUserItem } from "@/api/user/type";
import { useEffect, useState } from "react";
import { SessionCookies } from "@/libs/cookies";
import { usePostLoginOidc } from "@/app/(public)/auth/oauth-callback/_hooks/use-post-login-oidc";
import { useNavigate } from "react-router-dom";

type Session = {
  signin: (payload: TLoginOidcParam) => void;
  signout: () => void;
  session?: {
    access_token: string;
    refresh_token: string;
    user: TUserItem;
  };
  status?: "authenticated" | "authenticating" | "unauthenticated";
};

const SessionContext = createContext<Session>({
  signin: () => {},
  signout: () => {},
  session: undefined,
  status: undefined,
});

const SessionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session["session"]>();
  const [status, setStatus] = useState<Session["status"]>();

  const { mutate: oidcMutate } = usePostLoginOidc();

  useEffect(() => {
    const session = SessionCookies.get();
    if (session) {
      setSession(session);
      setStatus("authenticated");
    } else {
      setStatus("unauthenticated");
    }
  }, []);

  const signin = (payload: TLoginOidcParam) => {
    setStatus("authenticating");
    oidcMutate(payload, {
      onSuccess: (res) => {
        setSession(res.data);
        setStatus("authenticated");
        SessionCookies.set(res.data);
        setTimeout(() => {
          navigate("/dashboard");
        }, 600);
      },
      onError: () => {
        setStatus("unauthenticated");
      },
    });
  };

  const signout = () => {
    setStatus("unauthenticated");
    setSession(undefined);
    SessionCookies.remove();
    navigate("/auth/login");
  };
  return (
    <SessionContext.Provider
      value={{
        session,
        status,
        signin,
        signout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};

export default SessionProvider;

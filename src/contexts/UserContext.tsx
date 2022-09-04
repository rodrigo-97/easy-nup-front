import { createContext, useContext, useEffect, useState } from "react";
import { me } from "../services/Auth";

type ContextParam = {
  email?: string;
  avatarUrl?: string;
  emailVerified?: boolean;
  name?: string;
};

type Props = {
  children: React.ReactElement;
};

const UserContext = createContext<ContextParam>({} as ContextParam);

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<ContextParam>();

  useEffect(() => {
    me().then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        avatarUrl: user?.avatarUrl,
        email: user?.email,
        emailVerified: user?.emailVerified,
        name: user?.name,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

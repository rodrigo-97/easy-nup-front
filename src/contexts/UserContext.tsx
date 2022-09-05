import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../app/Models/User";
import { me } from "../services/Auth";

type ContextParam = {
  email?: string | null;
  avatarUrl?: string | null;
  emailVerified?: boolean | null;
  name?: string | null;
  isCompany?: boolean | null;
};

type Props = {
  children: React.ReactElement;
};

const UserContext = createContext<ContextParam>({} as ContextParam);

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User>();

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
        isCompany: !!user?.company
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

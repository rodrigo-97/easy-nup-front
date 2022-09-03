import { createContext, useContext, useEffect, useState } from "react";

type ContextProps = {
  theme: string;
  toggleTheme: () => void;
};

type Props = {
  children: React.ReactElement;
};

const ThemeContext = createContext({} as ContextProps);

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const localTheme = localStorage.getItem("APP_THEME" ?? "dark")!;

    if (localTheme) {
      setTheme(localTheme);
    } else {
      setTheme("dark");
      localStorage.setItem("APP_THEME", "dark");
    }

    if (localTheme === "dark") {
      document.body.classList.remove("light");
      return document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      return document.body.classList.add("light");
    }
  }, []);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");

    if (theme === "dark") {
      document.body.classList.remove("dark");
      localStorage.setItem("APP_THEME", "light");
      return document.body.classList.add("light");
    }

    document.body.classList.remove("light");
    localStorage.setItem("APP_THEME", "dark");
    return document.body.classList.add("dark");
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

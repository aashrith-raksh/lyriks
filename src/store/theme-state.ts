import { createContext, useContext } from "react";

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const themeProviderContext = createContext<ThemeProviderState>(initialState);

export const useTheme = () => {
  const context = useContext(themeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};


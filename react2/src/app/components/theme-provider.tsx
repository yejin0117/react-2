import {createContext, use, useEffect, useState} from "react";

export const ThemeContext = createContext<{
    theme: "light" | "dark",
    toggleTheme: () => void 
}>({
    theme: "light",
    toggleTheme: () => {}
});

export default function ThemeProvider({children}: {children: React.ReactNode}) {
    const [theme, setTheme] = useState<"light" | "dark">("light");  

    useEffect(() => {
        if(typeof window !== "undefined") {
          document.documentElement.dataset.theme = theme;
        }
    }, [theme]);

    const toggleTheme = () => {setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))}
    return(
    <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
  )
} 

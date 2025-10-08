import { useState, useEffect, createContext } from 'react';

const AppContext = createContext('світла');
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('світла');
    const switchTheme = () => {
        setTheme(prev => (prev === 'світла' ? 'темна' : 'світла'));
    };

    useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme === 'світла' ? 'light' : 'dark');
    }, [theme]);

    return (
        <AppContext.Provider value={{ theme, switchTheme }}>
            {children}
        </AppContext.Provider >
    );

};

export { AppContext, ThemeProvider };
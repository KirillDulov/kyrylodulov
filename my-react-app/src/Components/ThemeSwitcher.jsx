import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchTheme } from '../reducers/themeReducer'

const ThemeSwitcher = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme);

    useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme === 'світла' ? 'light' : 'dark');
    }, [theme]);

    return (
        <div style={{ padding: 20 }}>
            <h2>Поточна тема: {theme}</h2>
            <button onClick={() => dispatch(switchTheme())}>Перемкнути тему</button>
        </div>
    );
};

export default ThemeSwitcher;
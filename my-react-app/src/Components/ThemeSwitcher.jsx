import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchTheme } from '../slices/themeSlice';


const ThemeSwitcher = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme);

    useEffect(() => {
        console.log('Current theme:', theme);
        document.body.classList.remove('світла', 'темна');
        document.body.classList.add(theme);
    }, [theme]);

    return (
        <div style={{ padding: 20 }}>

            <div className="switch-container" onClick={() => dispatch(switchTheme())}>
                <div className='switch-slider'></div>
            </div>
        </div>
    );
};

export default ThemeSwitcher;
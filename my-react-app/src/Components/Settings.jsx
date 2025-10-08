import { useContext } from "react";
import { ThemeContext } from "styled-components";

const Settings = ({ theme }) => {
    return (
        <div className={theme === 'світла' ? 'світла' : 'темна'}>
            SOME SETTINGS NAME
        </div>
    )
};

export default Settings;
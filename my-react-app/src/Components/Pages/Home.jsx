import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
const Home = () => {
    const { theme, switchTheme } = useContext(AppContext);
    return (
        <div> 
            <h3>Поточна тема: {theme}</h3>
            <button onClick={switchTheme}>Перемкнути</button>
        </div>
    );
};

export default Home;
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Posts from "../../Containers/Posts";

const Home = () => {
    const { theme, switchTheme } = useContext(AppContext);
    return (
        <Posts />
        // <div> 
            /* <h3>Поточна тема: {theme}</h3> */ 
    /* <button onClick={switchTheme}>Перемкнути</button> */ 
    /* </div> */ 
    );
};

export default Home;
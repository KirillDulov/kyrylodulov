import { useState } from 'react';
import Button from '../../src/Components/Button';
import Paragraph from '../../src/Components/Paragraph';

const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <Paragraph text={`Лічильник: ${count}`}/>
            <Button onClick={increment} text='Збільшити'/>
        </div>
    );
};

export default Counter;
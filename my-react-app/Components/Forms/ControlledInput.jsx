import { useState } from "react";

export default function ControlledInput() {
    const [value, setValue] = useState('');
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <div>
            <input type="text"
             value={value}
             onChange={handleChange}
             placeholder="Введіть текст"
            />
            <p>Ви ввели {value}</p>
        </div>
    );
};
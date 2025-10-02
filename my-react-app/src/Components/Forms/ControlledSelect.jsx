import { useState } from "react";

export default function ControlledSelect() {
    const [moto, setMoto] = useState('');
    const handleChange = (e) => {
        setMoto(e.target.value);
    };
    return (
        <div>
            <label>
                Виберіть тип мотоциклу:
                <select value={moto} onChange={handleChange}>
                    <option value="Sport">Спорт</option>
                    <option value="Chopper">Чоппер</option>
                    <option value="Street">Стріт</option>
                </select>
            </label>
            <p>Ви вибрали: {moto}</p>
        </div>
    );
};

import { useRef } from "react";

export default function UncontrolledInput() {
    const nameRef = useRef();
    const emailRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`
            Ім'я: ${nameRef.current.value}
            Email: ${emailRef.current.value}
        `);
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Ім’я:
                    <input type="text" ref={nameRef} placeholder="Введіть ім'я" />
                </label>
            </div>

            <div>
                <label>
                    Email:
                    <input type="email" ref={emailRef} placeholder="Введіть email" />
                </label>
            </div>

            <button type="submit">Відправити</button>
        </form>
    )
}
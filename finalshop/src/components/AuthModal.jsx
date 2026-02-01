import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

export default function AuthModal({ onClose }) {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: e.target.email.value,
        };

        dispatch(login(user));
        onClose();
    };

    return (
        <div className="modal">
            <h2>Вход</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder="Email" required />
                <input type="password" placeholder="Пароль" required />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
}
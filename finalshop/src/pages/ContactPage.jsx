import React, { useState } from 'react';
import './ContactPage.css';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !message) {
            alert("Будь ласка, заповніть всі поля.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (!response.ok) {
                throw new Error('Щось пішло не так. Спробуйте ще раз.');
            }

            const data = await response.json();

            alert('Дякуємо! Ваше повідомлення надіслано.');
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            setError(error.message);
            alert('Щось пішло не так, спробуйте ще раз.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="contact-page">
            <h1 className="contact-heading">Контакти</h1>
            <div className="contact-info">
                <p><strong>Телефон:</strong> +380 123 456 789</p>
                <p><strong>Email:</strong> support@ladystyle.com</p>
                <p><strong>Адреса:</strong> вул. Петра Сагайдачного, 7, Київ, Україна</p>
            </div>

            <h2>Форма зворотного зв'язку</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
                <label>
                    Ваше ім'я:
                    <input
                        type="text"
                        placeholder="Введіть своє ім'я"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Ваш email:
                    <input
                        type="email"
                        placeholder="Введіть ваш email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Повідомлення:
                    <textarea
                        placeholder="Введіть ваше повідомлення"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Завантаження...' : 'Відправити'}
                </button>

                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}
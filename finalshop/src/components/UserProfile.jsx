import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateUserProfile, logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [message, setMessage] = useState("");

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user?.role === "admin") {
            const fetchUsers = async () => {
                setLoading(true);
                try {
                    const res = await fetch("http://localhost:5000/api/users", {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    });
                    const data = await res.json();
                    setUsers(data);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchUsers();
        }
    }, [user]);

    if (!user) return <p>Користувач не авторизований</p>;

    const handleSave = () => {
        dispatch(updateUserProfile({ username, email }));
        setMessage("Профіль оновлено!");
        setEditMode(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const recentActions = [
        { id: 1, action: "Додав товар в кошик", date: "2026-02-19" },
        { id: 2, action: "Переглянув сторінку 'Сукня чорна'", date: "2026-02-18" },
        { id: 3, action: "Зробив замовлення", date: "2026-02-17" },
    ];

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <h2>Мій профіль</h2>
            <button onClick={handleLogout} style={{ marginBottom: "20px", background: "red", color: "white" }}>
                Вийти з профілю
            </button>

            {editMode ? (
                <div>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Ім'я"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <button onClick={handleSave}>Зберегти</button>
                    <button onClick={() => setEditMode(false)}>Відмінити</button>
                </div>
            ) : (
                <div>
                    <p><strong>Ім'я:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Роль:</strong> {user.role}</p>
                    <p><strong>Дата реєстрації:</strong> {user.createdAt || "N/A"}</p>
                    <button onClick={() => setEditMode(true)}>Редагувати профіль</button>
                </div>
            )}
            <h3>Останні дії</h3>
            <ul>
                {recentActions.map(a => (
                    <li key={a.id}>
                        {a.date}: {a.action}
                    </li>
                ))}
            </ul>

            {message && <p style={{ color: "green" }}>{message}</p>}

            {user.role === "admin" && (
                <div style={{ marginTop: "40px" }}>
                    <h3>Список користувачів</h3>
                    {loading ? (
                        <p>Завантаження...</p>
                    ) : (
                        <ul>
                            {users.map(u => (
                                <li key={u._id}>
                                    {u.username} — {u.email} — {u.role}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
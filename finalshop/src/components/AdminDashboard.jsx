import { useEffect, useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/users")
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <div className="admin-dashboard">
            <h2>Кабінет Адміна</h2>
            <h3>Список користувачів</h3>

            <div className="table">
                <div className="table-header">
                    <div>Ім’я</div>
                    <div>Email</div>
                    <div>Роль</div>
                </div>

                {users.map((u, index) => (
                    <div key={u._id} className={`table-row ${index % 2 === 0 ? "even" : "odd"}`}>
                        <div>{u.username}</div>
                        <div>{u.email}</div>
                        <div>{u.role}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
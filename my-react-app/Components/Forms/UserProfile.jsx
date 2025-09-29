import { useState, useEffect } from "react";

export default function UserProfile() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/3");
        if (!response.ok) {
          throw new Error("Не вдалося завантажити користувача");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Завантаження даних користувача...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Помилка: {error}</p>;
  }

  return (
    <div>
      <h2>Профіль користувача</h2>
      <p><strong>Ім’я:</strong> {user.name}</p>
      <p><strong>Юзернейм:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Місто:</strong> {user.address.city}</p>
    </div>
  );
}
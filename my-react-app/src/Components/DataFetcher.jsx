import { useState, useEffect } from "react";
import axios from 'axios';

const DataFetcher = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
                setUsers(usersResponse.data);
            } catch (error) {
                setError('Помилка отримання данних:' +  error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return (
        <h1>Loading...</h1>
    );

    if (error) return (
        <h1>{error}</h1>
    );

    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <p>Ім'я: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ))};
        </div>
    );
};

export default DataFetcher;

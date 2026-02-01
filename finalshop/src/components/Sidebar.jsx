import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <h3>Категорії</h3>
            <ul>
                <li>
                    <NavLink to="/">Всі товари</NavLink>
                </li>
                <li>
                    <NavLink to="/featured">Новинки</NavLink>
                </li>
                <li>
                    <NavLink to="/sale">Скидки</NavLink>
                </li>
            </ul>
        </aside>
    );
}
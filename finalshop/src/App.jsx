import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import AddProductForm from "./components/AddProductForm";
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';

import HomePage from './pages/HomePage';
import Featured from './pages/Featured';
import Sale from './pages/Sale';
import AddProductPage from './pages/admin/AddProductPage';
import ContactPage from './pages/ContactPage';
import FavoritesPage from './pages/FavoritesPage';

import { Routes, Route } from 'react-router-dom';

import './App.css';

export default function App() {
  return (
    <>
      <Header />

      <div className="layout">
        <Sidebar />

        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/featured" element={<Featured />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/admin/add-product" element={<AddProductPage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/addproduct" element={<AddProductForm />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/profile" element={<ProtectedRoute role="user"> <UserProfile /> </ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute role="admin"> <AdminDashboard /> </ProtectedRoute>} />
          </Routes>
        </main>
      </div>

      <Footer />
    </>
  );
}
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import Featured from './pages/Featured';
import Sale from './pages/Sale';

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
          </Routes>
        </main>
      </div>

      <Footer />
    </>
  );
}
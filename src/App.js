import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Products from "./Pages/Product/Products"
import Orders from "./Pages/Order/Orders"
import { Users, User } from "./Pages/User/Users"
import Navbar from './Components/Navbar/Navbar';
import Profile from './Pages/Profile';
import Product from './Pages/Product/Product';
import Mails from './Pages/Mail/Mails';
import Announcement from './Pages/Announcements/Announcement';
import Slideshow from "./Pages/Slideshow/Slideshow";
import Logs from './Pages/Logs/Logs';
import Welcome from './Components/Welcome';

const Layout = ({ children }) => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/" && location.pathname !== "/login";

  return (
    <div className="app-container">
      {showNavbar && <Navbar />}
      <main className={`main-content ${showNavbar ? 'sidebar-active' : ''}`}>
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mails" element={<Mails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/slideshow" element={<Slideshow />} />
          <Route path="/announcements" element={<Announcement />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/report" element={<Logs />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

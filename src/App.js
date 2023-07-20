import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Mail from "./Pages/Mail/Mails"
import Products from "./Pages/Product/Products"
import Orders from "./Pages/Order/Orders"
import {Users,User} from "./Pages/User/Users"
import Navbar from './Components/Navbar/Navbar';
import Profile from './Pages/Profile';
import Product from './Pages/Product/Product';
import Mails from './Pages/Mail/Mails';
import Announcement from './Pages/Announcements/Announcement';
import Slideshow from "./Pages/Slideshow/Slideshow";
import Chat from "./Pages/Chat/Chat";
function App() {
  return (
    <div>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home/>}/>
            <Route path="mails" element={<Mails/>}/>
            <Route path="products" element={<Products/>}/>
            <Route path="product/:id" element={<Product/>}/>
            <Route path="users" element={<Users/>}/>
            <Route path="orders" element={<Orders/>}/>
            <Route path="users/:id" element={<User/>}/>
            <Route path="slideshow" element={<Slideshow/>}/>
            <Route path="chat" element={<Chat/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="announcements" element={<Announcement/>}/>
            <Route path="profile" element={<Profile/>}/>

            {/* path to direct to home if anything wierd happends */}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

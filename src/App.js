import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Account from './pages/Account';

function App() {
    const isUserSignedIn = localStorage.getItem('token');

  return (
    <div>
      <Navbar />
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />  
       <Route path="/signup" element={<SignUp />} />  
       {isUserSignedIn && <Route path="/account" element={<Account />} />  }
      </Routes>
    </div>
  );
}

export default App;

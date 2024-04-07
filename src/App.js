
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import {NavBar,BottomNavBar} from './components/NavBar';
import Post from './components/Post';
import Profile from './components/Profile';
import CreateUser from './components/CreateUser';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/Post' element={<Post/>} />
        <Route exact path='/Profile' element={<Profile/>} />
        <Route exact path='/CreateUser' element={<CreateUser/>}/>
        <Route exact path='/Login' element={<LoginPage/>}/>
      </Routes>
      <BottomNavBar/>
    </Router>
  );
}

export default App;

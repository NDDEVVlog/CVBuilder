import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import MyResumes from 'pages/MyResumes/MyResumes';
import Login from 'pages/Login/Login';
import Profile from 'pages/Profile/Profile';
import Register from 'pages/Register/Register';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/MyResumes' element={<MyResumes/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Profile' element={<Profile/>}/>
          <Route path='/Register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

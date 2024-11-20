import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';

import Register from 'pages/Register/Register';
import Profile from 'pages/Profile/Profile';
import MyResumes from 'pages/MyResumes/MyResumes';
import CreateResume from 'pages/CreateResume/CreateResume';
import NavBar from 'components/Navbar';
import Login from 'pages/Login/Login';
import SignUp from 'pages/Signup';
import Templated from 'pages/Templated/Templated';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/MyResumes' element={<MyResumes/>}/>

          <Route path='/Profile' element={<Profile/>}/>
          <Route path='/Register' element={<Register/>}/>

          <Route path='/Signup' element={<SignUp/>}/>
          <Route path='/Login' element={<Login/>}/>

          <Route path='/CreateResume' element={<CreateResume/>}/>
          <Route path='/Templated' element={<Templated/>}/>


        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

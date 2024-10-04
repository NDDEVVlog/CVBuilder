import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import Profile from 'pages/Profile/Profile';
import MyResumes from 'pages/MyResumes/MyResumes';
import NavBar from 'components/Navbar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/MyResumes' element={<MyResumes/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import MyResumes from 'pages/MyResumes/MyResumes';
import Login from 'pages/Login/Login';
import Profile from 'pages/Profile/Profile';
import Register from 'pages/Register/Register';
import SignUp from 'pages/Signup';
import CreateCV from 'pages/CreateCV/CreateCV';
import CreateResume from 'pages/CreateResume/CreateResume';
import CV1 from 'pages/CreateCV/1/CV1';
import CV2 from 'pages/CreateCV/2/CV2';
import CV3 from 'pages/CreateCV/3/CV3';

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

          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/Login' element={<Login/>}/>

          <Route path='/CreateResume' element={<CreateResume/>}/>
          <Route path='/CreateResume/:id' element={<CreateCV/>}/>
          <Route path='/CreateResume/1/:id' element={<CV1 />} />
          <Route path='/CreateResume/2/:id' element={<CV2 />} />
          <Route path='/CreateResume/3/:id' element={<CV3 />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

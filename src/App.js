import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteState from './Context/NoteState';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  return (
    <>
      <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;

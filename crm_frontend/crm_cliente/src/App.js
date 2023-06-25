import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {ProspectoPage} from './pages/ProspectoPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/prospecto" />}/>
        <Route path="/prospecto" element={<ProspectoPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

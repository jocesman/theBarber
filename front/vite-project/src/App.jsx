import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import AuthForm from './components/Authform/AuthForm';
import RegForm from './components/RegForm/RegForm';
import ErrorPage from './components/ErrorPage';
import RecuperarPass from './components/RecuperarPass/RecuperarPass';

function App() {

  const location = useLocation();

  return (
    <div className='App'>
      {(location.pathname === '/' || 
        location.pathname === '/CrearCuenta'||
        location.pathname === '/RecuperarContrasena') 
        ? null : <NavBar />
       }

      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path='/CrearCuenta' element={<RegForm />} />
        <Route path='/RecuperarContrasena' element={<RecuperarPass />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </ div>
  )
}

export default App;

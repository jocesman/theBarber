import '../css/NavBar.css';
import TheBarber from '../Images/TheBarber.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserProvider';

function NavBar() {
  const navigate = useNavigate();
  const { usuario, logout } = useContext(UserContext);

  return (
    <div className="navbar">
      <div className="imagenBarber">
        <img src={TheBarber} alt="Logo The Barber"/>
      </div>
      <div className="navbar-content">
        <Link className="link" to="/QuienesSomos">QUIENES SOMOS</Link>
        <Link className="link" to="/turnos">MIS TURNOS</Link>
        <Link className="link" to="/servicios">SERVICIOS</Link>
        <Link className="link" to="/contacto">CONTACTO</Link>
      </div>
      <div className="credenciales">
        <label>Usuario: {usuario.userName + ' ' + usuario.userLastName}</label>
        <label onClick={logout}>Salir</label>
      </div>
    </div>
  );
} 

export default NavBar;
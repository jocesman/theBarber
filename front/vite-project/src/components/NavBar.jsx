import '../css/NavBar.css';
import TheBarber from '../Images/TheBarber.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
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
        <label>Usuario</label>
        <label onClick={() => navigate('/')}>Salir</label>

      </div>
    </div>
  );
} 

export default NavBar;
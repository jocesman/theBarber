import '../css/NavBar.css';

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="imagenBarber">
            {/* Imagen de logo */}
             <img src="https://thumbs.dreamstime.com/z/dise%C3%B1o-del-vector-de-la-insignia-logotipo-bandera-peluquero-barber%C3%ADa-los-hombres-plantilla-139643489.jpg"/>
      </div>
      <div className="navbar-content">
        <span>QUIENES SOMOS</span>
        <span>MIS TURNOS</span>
        <span> SERVICIOS</span>
        <span>CONTACTO</span>
      </div>
    </div>
  );
}

export default NavBar;
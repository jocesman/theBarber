
import Home from './views/Home'
import Appointments from './views/Appointments'
import NavBar from "./components/NavBar";
import Servicios from './views/Servicios';
import Contacto from './components/Contacto';
import AuthForm from './components/AuthForm';
import { useState, useEffect } from 'react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setShowWelcome(true);
      setTimeout(() => {
        setShowWelcome(false);
      }, 2000);
    }
  }, [isAuthenticated]);

  return (
    <div>
      {!isAuthenticated ? (
        <AuthForm onLogin={() => setIsAuthenticated(true)} />
      ) : showWelcome ? (
        <>
        <h1>The Barber</h1>
        <h3>Bienvenido al control de citas</h3>
        <div style={{display:"flex", justifyContent:"center"}}>
        <img style={{width:"10%"}} src="https://img.freepik.com/vector-premium/icono-poste-peluquero-vector-simbolo-barberia_883533-2.jpg" alt="Barber Logo" />
        </div>
        <br />
        <br />
        <h2>Cargando sus datos, por favor espere un momento ...</h2>
        <br />
        </>
      ) : (
        <>
        <NavBar />
        <Appointments/>
        </>
      )}
    </div>
  );
};

export default App;
  


//   return (
//     <>
//       <AuthForm />
//       <NavBar />
//       {/* <Home /> */}
//       {/* <Appointments /> */}
//       {/* <Servicios /> */}
//       {/* <Contacto /> */}
//     </>
//   )
// }

// export default App

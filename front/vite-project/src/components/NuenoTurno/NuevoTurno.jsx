import { useState } from "react";
import "../../css/NuevoTurno.css";

export default function NuevoTurnoForm() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const manejarCambioFecha = (e) => {
    setFecha(e.target.value);
  };

  const manejarCambioHora = (e) => {
    setHora(e.target.value);
  };

  const obtenerFechaMinima = () => {
    const hoy = new Date();
    return hoy.toISOString().split("T")[0];
  };

  const obtenerFechaMaxima = () => {
    const hoy = new Date();
    hoy.setMonth(hoy.getMonth() + 1);
    return hoy.toISOString().split("T")[0];
  };

  const horasDisponibles = [];
  for (let i = 8; i <= 18; i++) {
    horasDisponibles.push(`${i.toString().padStart(2, "0")}:00`);
  }

  return (
    <div className="form-container">
      <h2>Crear Nuevo Turno</h2>
      <form>
        <div className="form-group">
          <label>Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={manejarCambioFecha}
            min={obtenerFechaMinima()}
            max={obtenerFechaMaxima()}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Hora</label>
          <select
            value={hora}
            onChange={manejarCambioHora}
            className="input-field"
          >
            <option value="">Selecciona una hora</option>
            {horasDisponibles.map((h, index) => (
              <option key={index} value={h}>{h}</option>
            ))}
          </select>
        </div>
        <div className="button-group">
          <button
            type="submit"
            className="btn-primary"
            disabled={!fecha || !hora}
          >
            Crear Turno
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => { setFecha(""); setHora(""); }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

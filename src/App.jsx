import React, { useState, useEffect } from "react";

import "./styles.css";

import { fetchFromFirebase, saveToFirebase } from "./firebaseService";
import { collection, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";


import { LineasDeProducción } from "./components/LineasDeProducción";
import { Ausentismo } from "./components/Ausentismo";
import { Uap } from "./components/Uap";


const App = () => {

  const [enMantenimiento, setEnMantenimiento] = useState(false);

  useEffect(() => {
    const docRef = doc(db, "config", "mantenimiento");

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setEnMantenimiento(snapshot.data().activo);
      }
    });

    fetchFromFirebase(setDotacionUAP, setAusentismo, setDotaciones);

    return () => unsubscribe(); // Limpiar la suscripción cuando el componente se desmonte

  }, []);

  const lineasProduccion = ["Línea 310", "Línea 320", "Línea 330", "Línea 340"];
  const turnos = ["Mañana", "Tarde", "Noche"];
  const rolesUAP = ["Calidad", "Seguridad", "Lean", "Lean"];

  const [dotacionUAP, setDotacionUAP] = useState(Array(4).fill(""));
  const [ausentismo, setAusentismo] = useState([]);

  const [dotaciones, setDotaciones] = useState(
    lineasProduccion.reduce((acc, linea) => {
      acc[linea] = turnos.reduce((tAcc, turno) => {
        tAcc[turno] = Array(5).fill("");
        return tAcc;
      }, {});
      return acc;
    }, {})
  );

  const [personasLista, setPersonasLista] = useState(["Ponce Nestor", "Gonzáles Damián", "Guzmán Juan", "Condori Martina", "Ramos Gustavo", "Coronel Luis", "Villalva Daniel", "Ferreiro Mariano", "Vaquel Juan", "Pedraza Rubén", "Tebes Ángel", "Pereyra David", "Montenegro Joel", "Ruiz Díaz Damián", "Quipildor Amadeo", "Mollo Miguel", "Santacruz Matías", "Ojeda Gastón", "Ponce Mario", "Rojo Cesar", "Berardi Ezequiel", "Juárez Nicolás", "Staciuk José", "Moras Rodrigo", "Chamarro Maximiliano", "Melgarejo Mauro", "Sotelo Diego", "Golini Juan Cruz", "Rosso Julio", "Leiva Maximiliano", "Rodiguez Claudio", "Grassi Jorge", "Taño Cristian", "Crescitelli Juan", "Leone Gustavo", "Torres Ángel", "Colman Javiér", "Rodriguez Gonzalo", "Villa Francisco", "Toledo Andrés", "Acosta Eduardo", "Kouyomdjian Martín", "Álvarez Roberto", "Dorch Eduardo", "Seipel Guillermo", "Díaz Hernan", "Cerdán Leonel", "Gimenez Juan", "Dorrego Lucas", "Insaurralde Esmir", "Segovia Hernán", "Asslborn Elías", "Almaraz Sergio", "Correa Gastón", "Ortíz Jose", "Martinez Carlos", "Campos Juan", "Lorenzo Negreti", "Reinoso Manuel", "Santillán Roberto", "Arias Gustavo", "Barreto Federico", "Markovics Claudio"]);
  const [nuevaPersona, setNuevaPersona] = useState(""); // Estado para la nueva persona

  // Función para agregar una nueva persona a la lista
  const agregarPersona = () => {
    if (nuevaPersona.trim() !== "" && !personasLista.includes(nuevaPersona)) {
      setPersonasLista([...personasLista, nuevaPersona]); // Agregar a la lista
      setNuevaPersona(""); // Limpiar el input
    }
  };

  // Obtener todas las personas seleccionadas en cualquier línea y turno
  const personasOcupadas = Object.values(dotaciones)
    .flatMap(turnos => Object.values(turnos))
    .flat(); // Convertir en un solo array con todas las selecciones

  // Guardar el estado de mantenimiento en Firebase
  const toggleMantenimiento = async () => {
    const nuevoEstado = !enMantenimiento;
    await setDoc(doc(db, "config", "mantenimiento"), { activo: nuevoEstado });
  };

  return (

    <div>
      <div>{(enMantenimiento) ?
        <>
          <button className="boton-habilitar" onClick={toggleMantenimiento}>
            Desbloquear página dotaciones
          </button>
          <h5>⚠️ Página de Operadores deshabilitada ⚠️</h5>
        </>
        :
        <button className="boton-mantenimiento" onClick={toggleMantenimiento}>
          Bloquear página dotaciones
        </button>
      }
      </div>


      <div className="container">


        <h1 className="title">Dotaciones por Turno</h1>

        {/* Lista de Producción */}
        <LineasDeProducción
          lineasProduccion={lineasProduccion}
          turnos={turnos}
          dotaciones={dotaciones}
          setDotaciones={setDotaciones}
          personasLista={personasLista}
          personasOcupadas={personasOcupadas}
        />

        {/* Ausentismo */}
        <Ausentismo
          ausentismo={ausentismo}
          setAusentismo={setAusentismo}
        />

        {/* Tabla UAP */}
        <Uap
          rolesUAP={rolesUAP}
          dotacionUAP={dotacionUAP}
          setDotacionUAP={setDotacionUAP}
        />

        {/* Botón para guardar en base de datos */}
        <button className="save-button" onClick={() => saveToFirebase(dotaciones, ausentismo, dotacionUAP)}>Guardar</button>

        {/* Lista de personas al final con tilde */}
        <div className="personas-lista-container">
          <h3>Lista de Operadores</h3>
          <ul className="personas-lista">
            {personasLista.map((p, i) => (
              <li key={i} className={personasOcupadas.includes(p) ? "ocupada" : ""}>
                {p} {personasOcupadas.includes(p)}
              </li>
            ))}
          </ul>
          {/* Input para agregar una nueva persona */}
          <div className="agregar-persona">
            <input
              type="text"
              placeholder="Nueva persona"
              value={nuevaPersona}
              onChange={(e) => setNuevaPersona(e.target.value)}
            />
            <button onClick={agregarPersona}>Agregar</button>
          </div>

        </div>

      </div>
    </div>
  );


};

export default App;

import React from 'react'
import { Turnos } from './Turnos';

export const LineasDeProducción = ({ lineasProduccion, turnos, dotaciones, setDotaciones, setCantidadOperadores, personasLista, personasOcupadas }) => {

    const rotarTurnos = (linea) => {
        setDotaciones((prevDotaciones) => {
            const nuevaDotacion = { ...prevDotaciones };

            // Obtener los valores actuales
            const noche = nuevaDotacion[linea]["Noche"];
            const tarde = nuevaDotacion[linea]["Tarde"];
            const mañana = nuevaDotacion[linea]["Mañana"];

            // Verificar si el turno Noche está completamente vacío
            const nocheVacia = noche.every((persona) => persona === "");

            if (nocheVacia) {
                // Crear una copia profunda del estado para evitar mutaciones
                const nuevaDotacion = JSON.parse(JSON.stringify(prevDotaciones));

                // Intercambiar los valores entre Mañana y Tarde
                [nuevaDotacion[linea]["Mañana"], nuevaDotacion[linea]["Tarde"]] =
                    [nuevaDotacion[linea]["Tarde"], nuevaDotacion[linea]["Mañana"]];

                return nuevaDotacion; // Devolvemos el nuevo estado modificado
            } else {
                // Si el turno Noche tiene datos, hacer la rotación completa
                nuevaDotacion[linea]["Noche"] = [...mañana];
                nuevaDotacion[linea]["Tarde"] = [...noche];
                nuevaDotacion[linea]["Mañana"] = [...tarde];
            }


            return { ...nuevaDotacion };
        });
    };

    const eliminarTurnos = (linea) => {
        setDotaciones(prevState => ({
            ...prevState,
            [linea]: turnos.reduce((acc, turno) => {
                acc[turno] = []; // Vacía los operadores en cada turno de la línea
                return acc;
            }, {})
        }));
    };

    const eliminarPersonas = (linea) => {
        setDotaciones(prevState => ({
            ...prevState,
            [linea]: turnos.reduce((acc, turno) => {
                acc[turno] = prevState[linea][turno].map(() => ""); // Mantiene los espacios vacíos
                return acc;
            }, {})
        }));
    };

    return (
        <>
            {lineasProduccion.map((linea) => (

                <div key={linea} className="linea">
                    <h2 className="linea-title">{linea}</h2>
                    <button className='button-rotar' onClick={() => rotarTurnos(linea)}>
                        <img
                            src="/IconoRotarByn.png"
                            alt="Rotar"
                            width="20"
                            height="20"
                            style={{ marginRight: "20px", marginLeft: "-4px" }}
                        />
                    </button>

                    <button className="delete-people-btn" onClick={() => eliminarPersonas(linea)}>
                        <img
                            src="/EliminarPersonas.png"
                            alt="Rotar"
                            width="20"
                            height="20"
                            style={{ marginRight: "20px", marginLeft: "-4px" }}
                        />
                    </button>

                    <Turnos
                        turnos={turnos}
                        dotaciones={dotaciones}
                        setDotaciones={setDotaciones}
                        linea={linea}
                        personasLista={personasLista}
                        personasOcupadas={personasOcupadas}
                    />
                </div>
            ))}
        </>
    )
}



// {lineasProduccion.map((linea) => (
//     <div key={linea} className="linea">
//       <h2 className="linea-title">{linea}</h2>
//       {turnos.map((turno) => (
//         <div key={turno} className="turno">
//           <h3 className="turno-title">{turno}</h3>
//           <div className="inputs">
//             {dotaciones[linea][turno].map((persona, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 className="input"
//                 value={persona}
//                 placeholder={`Persona ${index + 1}`}
//                 onChange={(e) => handleChange(linea, turno, index, e.target.value)}
//               />
//             ))}
//           </div>
//         </div>
//       ))}
//       <button className="save-button" onClick={saveToFirebase}>
//         Guardar
//       </button>
//     </div>
//   ))}
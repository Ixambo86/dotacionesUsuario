import React from 'react'
import { Dotaciones } from './Dotaciones';

export const Turnos = ({ turnos, dotaciones, setDotaciones, linea, setCantidadOperadores, personasLista, personasOcupadas }) => {

    return (
        <>
            {turnos.map((turno) => (
                <div key={turno} className="turno">
                    <h3 className="turno-title">{turno}</h3>
                    <div className="inputs">
                        <Dotaciones
                            dotaciones={dotaciones}
                            setDotaciones={setDotaciones}
                            linea={linea}
                            turno={turno}
                            personasLista={personasLista}
                            personasOcupadas={personasOcupadas}
                        />

                    </div>
                </div>
            ))}


        </>
    )
}

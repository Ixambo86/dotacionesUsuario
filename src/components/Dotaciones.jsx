import React from 'react';

export const Dotaciones = ({ dotaciones, setDotaciones, linea, turno, personasLista, personasOcupadas }) => {
  

    const handleChange = (linea, turno, index, value) => {
        setDotaciones((prev) => ({
            ...prev,
            [linea]: {
                ...prev[linea],
                [turno]: prev[linea][turno].map((p, i) => (i === index ? value : p)),
            },
        }));
    };

    const agregarOperador = (linea, turno) => {
        setDotaciones((prevState) => ({
            ...prevState,
            [linea]: {
                ...prevState[linea],
                [turno]: [...prevState[linea][turno], ""], // Agrega un operador vacío
            },
        }));
    };

    const eliminarOperador = (linea, turno) => {
        setDotaciones((prevState) => ({
            ...prevState,
            [linea]: {
                ...prevState[linea],
                [turno]: prevState[linea][turno].slice(0, -1), // Eliminar el último operador
            },
        }));
    };

    return (
        <>
            {dotaciones[linea][turno].map((persona, index) => {
                // Filtra las personas disponibles excluyendo las ya seleccionadas en cualquier línea y turno,
                // pero permitiendo la que ya estaba en este input
                const personasDisponibles = personasLista.filter(
                    (p) => !personasOcupadas.includes(p) || p === persona
                );

                return (
                    <React.Fragment key={index}>
                        <input
                            type="text"
                            className="input"
                            value={persona}
                            list={`personas-lista-${linea}-${turno}-${index}`} // Lista única por input
                            placeholder={`Persona ${index + 1}`}
                            onChange={(e) => handleChange(linea, turno, index, e.target.value)}
                        />
                        <datalist id={`personas-lista-${linea}-${turno}-${index}`}>
                            {personasDisponibles.map((p, i) => (
                                <option key={i} value={p} />
                            ))}
                        </datalist>
                    </React.Fragment>
                );
            })}

            <button onClick={() => agregarOperador(linea, turno)}> + </button>
            <button className="delete-btn" onClick={() => eliminarOperador(linea, turno)}> - </button>

            
        </>
    );
};

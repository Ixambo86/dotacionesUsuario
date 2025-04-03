import React from 'react'

export const Ausentismo = ({ausentismo, setAusentismo}) => {

    const handleAusentismoChange = (index, field, value) => {
        const newAusentismo = [...ausentismo];
        newAusentismo[index] = { ...newAusentismo[index], [field]: value };
        setAusentismo(newAusentismo);
    };

    const addAusente = () => {
        setAusentismo([...ausentismo, { nombre: "", motivo: "Licencia" }]);
    };

    // Función para eliminar un ausente
    const eliminarAusente = (index) => {
        const nuevaLista = ausentismo.filter((_, i) => i !== index);
        setAusentismo(nuevaLista);
    };

    return (
        <>
            <h2 className="title">Ausentismo</h2>
            <table className="ausentismo-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Motivo</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {ausentismo.map((ausente, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    className="input"
                                    value={ausente.nombre}
                                    placeholder="Nombre"
                                    onChange={(e) => handleAusentismoChange(index, "nombre", e.target.value)}
                                />
                            </td>

                            <td>
                                <select
                                    className="input"
                                    value={ausente.motivo}
                                    onChange={(e) => handleAusentismoChange(index, "motivo", e.target.value)}
                                >
                                    <option value="Licencia">Licencia</option>
                                    <option value="Vacaciones">Vacaciones</option>
                                </select>
                            </td>
                            <td >
                                <button className="delete-btn" onClick={() => eliminarAusente(index)}>
                                    -
                                </button>
                            </td>
                        </tr>

                    ))}
                </tbody>

            </table>
            <button className="add-ausente-button" onClick={addAusente}>+</button>

        </>
    )
}

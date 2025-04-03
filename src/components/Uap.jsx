import React from 'react'

export const Uap = ({rolesUAP, dotacionUAP, setDotacionUAP}) => {
    return (
        <>

            <div className="uap-container">
                <h2 className="uap-title">UAP</h2>
                <div className="uap-roles">
                    {rolesUAP.map((rol, index) => (
                        <div key={index} className="uap-role">
                            <h3>{rol}</h3>
                            <input
                                type="text"
                                className="input"
                                value={dotacionUAP[index]}
                                placeholder={`Nombre ${rol}`}
                                onChange={(e) => {
                                    const nuevaDotacion = [...dotacionUAP];
                                    nuevaDotacion[index] = e.target.value;
                                    setDotacionUAP(nuevaDotacion);
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

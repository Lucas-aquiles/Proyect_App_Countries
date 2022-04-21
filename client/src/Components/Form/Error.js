import React from 'react'
import './Error.css'




const Error = ({ clearError_creado }) => {
    return (
        <div className='error' >
            <h1>Error , repeat name    </h1>
            <button onClick={e => clearError_creado(e)}>    X   </button>



        </div>
    )
}

export default Error
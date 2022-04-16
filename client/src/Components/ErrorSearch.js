import React from 'react'
import './ErrorSearch.css'

const ErrorSearch = ({ clearError_search }) => {
    return (
        <div className='errorsearch'>

            <h1>NO ENCONTRADO   </h1>
            <button onClick={e => clearError_search(e)}>    X   </button>



        </div>

    )
}

export default ErrorSearch
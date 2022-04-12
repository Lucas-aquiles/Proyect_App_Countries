import React from 'react';
import './Paginado.css'


export default function Paginado({ sizeArray, allCountries, paginado }) {

    // const [numero, setNumero] = useState("1")





    const pageNumber = []//1.2.3.4.5.6.7.8.9.10.....
    for (let i = 1; i <= Math.ceil(allCountries / sizeArray); i++) {

        pageNumber.push(i)
    }

    return (
        <div >
            {pageNumber && pageNumber.map(number => (
                <button key={number} onClick={() => {
                    paginado(number);
                }}>
                    {number}
                </button>

            ))}
        </div>



    );
}
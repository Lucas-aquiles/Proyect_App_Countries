import React, { useState, useEffect } from 'react'
import './Sorpresa.css'
import { useSelector } from 'react-redux';

const Sorpresa = () => {

    const allPaises = useSelector((state) => state.countries)
    const [paisoriginal, setPaisoriginal] = useState({})
    console.log(paisoriginal)
    const [pais1, setPais1] = useState({})
    const [pais2, setPais2] = useState({})



    var paisuplente1 = Math.floor(Math.random() * (250 - 0 + 1)) + 0;
    var paisuplente2 = Math.floor(Math.random() * (250 - 0 + 1)) + 0;
    var numeroAleatorio = Math.floor(Math.random() * (250 - 0 + 1)) + 0;
    var p_s1 = allPaises[paisuplente1]
    var p_s2 = allPaises[paisuplente2]
    var iC = allPaises[numeroAleatorio]


    function cac() {
        setPais1({
            ...pais1, p_s1
        })
        setPais2({
            ...pais2, p_s2
        })



        setPaisoriginal({
            ...paisoriginal,
            iC
        })
    }



    var sum = 0;
    let savePoblation = allPaises.map(elemento => sum += elemento.population)


    function convertirNumero(parametro) {
        var poblacion = String(parametro)
        var array = [];
        let poblacionRevers = poblacion.split("").reverse()
        for (var i = 0; poblacionRevers.length >= i; i += 3) {
            array.push(poblacionRevers.slice(i, i + 3).concat("."))
        };
        var cstr = array.join('')
        var strConvertido = cstr.replaceAll(",", "")
        var numeroCasi = (strConvertido.split("").reverse().join(""))

        if (numeroCasi[1] === ".") {
            return (numeroCasi.slice(2, numeroCasi.length))
        }
        if (numeroCasi[0] === ".") {
            return (numeroCasi.slice(1, numeroCasi.length))
        }

    }

    if (paisoriginal.iC !== undefined) {
        var name = paisoriginal.iC.name
        var imagen = paisoriginal.iC.flag_image
        var capital = paisoriginal.iC.capital
    }
    if (pais1.p_s1 !== undefined) {
        var capitalP1 = pais1.p_s1.capital
    }
    if (pais2.p_s2 !== undefined) {
        var capitalP2 = pais2.p_s2.capital
    }

    var arrayFijo = [capital, capitalP1, capitalP2]
    var numArray = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
    var savePrimer = arrayFijo[numArray]


    var array2elementos = arrayFijo.filter(e => e !== savePrimer)
    var sortOrdenados = array2elementos.sort()
    console.log(sortOrdenados)


    return (
        <div className='sorpresa'>
            <div>
                <div className='itemquestion1'>
                    <h1>   ¿ Cuál es la Población Mundial?  </h1>
                    <button> Quiero Saber.... </button>
                </div>

                <div className='itemquestion2'>
                    <h2>  Habitantes:   </h2>
                    <h2>{convertirNumero(sum)}</h2>
                </div>
            </div>

            {/* ------------------------- */}
            <div>

                <div className='itemquestion1' >
                    <h1>   ¿ Cuál es la capital de : ?  </h1>

                    <button onClick={e => cac(e)}>  Jugar </button>


                    <div className='randondiv'  >
                        <h2> {name}   </h2>
                        <img src={imagen} alt="" />
                    </div>
                    <div className='padresecundario'>
                        <div>
                            <h2> {savePrimer}</h2>

                        </div>
                        <div>
                            <h4> {sortOrdenados[0]}  </h4>
                        </div>
                        <div>
                            <h4> {sortOrdenados[1]} </h4>
                        </div>
                    </div>










                </div>
            </div>

        </div>
    )
}

export default Sorpresa
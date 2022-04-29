import React, { useState } from 'react'
import './Sorpresa.css'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';



const Sorpresa = () => {

    const allPaises = useSelector((state) => state.countriesAux)
    const [paisoriginal, setPaisoriginal] = useState({})
    const [pais1, setPais1] = useState({})
    const [pais2, setPais2] = useState({})
    const [chequear, setChequear] = useState(false)
    const [chequear1, setChequear1] = useState(false)
    const [paismundial, setPaismundial] = useState(0)



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
    function handlePoblation(e) {
        setPaismundial(convertirNumero(sum))
    }





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
    // console.log(sortOrdenados)


    function handleNames(e) {
        if (e.target.value === paisoriginal.iC.capital) {
            console.log(" lo encontre")
            setChequear(true)

        } else {
            console.log("no lo encontre")
            setChequear1(true)

        }

    }
    var comprobar = "ocultar"
    if (chequear === true) {
        comprobar = "nada"
        setTimeout(() => {
            setChequear(false)
        }, 2000);

    }
    var comprobar1 = "ocultar"
    if (chequear1 === true) {
        comprobar1 = "nada"
        setTimeout(() => {
            setChequear1(false)
        }, 2000);

    }



    return (
        <div className='sorpresa'>
            <div>
                <div className='itemquestion1'>
                    <h1>   ¿ Cuál es la Población Mundial?  </h1>
                    <button onClick={e => handlePoblation(e)}> Quiero Saber.... </button>
                </div>

                <div className='itemquestion2'>
                    <h2>  Habitantes:   </h2>
                    <h2>{paismundial}</h2>
                </div>
            </div>

            {/* ------------------------- */}
            <div className='mitad'>
                <div className="icon"   >
                    <Link to="/home" >
                        <FontAwesomeIcon className="iconFont" icon={faAngleLeft} /> </Link></div>
                <div className='itemquestion1' >
                    <h1>   ¿ Cuál es la capital de : ?  </h1>

                    <button onClick={e => cac(e)}>  Play </button>


                    <div className='randondiv'  >
                        <h2> {name}   </h2>
                        <img src={imagen} alt="" />
                    </div>


                    {savePrimer ?
                        <div className='padresecundario borrar'>
                            <button onClick={e => handleNames(e)} value={savePrimer}>
                                {savePrimer}

                            </button>
                            <button onClick={e => handleNames(e)} value={sortOrdenados[0]}    >
                                {sortOrdenados[0]}
                            </button>
                            <button onClick={e => handleNames(e)} value={sortOrdenados[1]}  > {sortOrdenados[1]}
                            </button>
                        </div> : null

                    }



                    <div className={`perfect ${comprobar}`}   >
                        <h2> Perfect is {capital}    </h2>
                    </div>
                    <div className={`segui ${comprobar1}`}>  <h2> Sigue participando...  </h2></div>










                </div>
            </div>

        </div>
    )
}

export default Sorpresa
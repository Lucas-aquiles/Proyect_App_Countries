import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountries, filter_Activities, filter_Continent, orderlyByName, orderlyByPoblation, getCountriesFront } from '../action/index'
import Paginado from './Paginado';
import Card from './Card';
import './Home1.css'
import Aside from './Aside';
import Loader from "./Loader"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightRotate } from '@fortawesome/free-solid-svg-icons'



const Home1 = () => {

    const allCountries = useSelector((state) => state.countries)

    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(clearStateCountries())
        dispatch(getCountries())
    }, [])


    const [orden, setOrden] = useState('');

    const [pagina, setPagina] = useState(1);
    const [sizeArray, setSize] = useState(10);
    const indexLastCountry = pagina * sizeArray  // 1 * 10  = 10 // 2*10 = 20//
    const indexFirstCountry = indexLastCountry - sizeArray //0//10        //   
    // 0 * 10 // 

    const currentCountry = allCountries.slice(indexFirstCountry, indexLastCountry)
    // si estas en pag 1 , entregame 0-9 obj. si estas pag 2 entregame 10-19

    function paginado(number) {
        setPagina(number)
    }

    function handlefilterAct(e) {
        // console.log(e.target.value)
        if (e.target.value === "act") {
            dispatch(getCountries())
            setPagina(1)
        } else {
            e.preventDefault();
            dispatch(filter_Activities(e.target.value));
            setPagina(1);
            // setOrden(`Ordenado ${e.target.value}`)
        }
    }

    function handlefilterContinent(e) {
        if (e.target.value === "default") {
            dispatch(getCountriesFront())
            setPagina(1)
        }

        else {
            e.preventDefault();
            dispatch(filter_Continent(e.target.value))
            setPagina(1)

        }

    }

    function handleOrderly(e) {
        if (e.target.value === "default") {
            dispatch(getCountriesFront());
            setPagina(1)

        }
        if (e.target.value === "a_z" || e.target.value === "z_a") {
            dispatch(orderlyByName(e.target.value));
            setPagina(1)
            setOrden(`Ordenado ${e.target.value}`)
            e.preventDefault();

        }
        if (e.target.value === "menor_p" || e.target.value === "mayor_p") {
            dispatch(orderlyByPoblation(e.target.value));
            setPagina(1);
            e.preventDefault();
            setOrden(`Ordenado ${e.target.value}`)
        }
    }

    function handleRecarga() {
        dispatch(getCountries())
        setPagina(1)

    }




    let suma = 1

    return allCountries.length === 0 ? (<Loader />) : (


        <div className='container'>
            <header>
                <div onClick={(e) => handleRecarga(e)} className='iconRecarga'>  <FontAwesomeIcon className="iconFontRecarga" icon={faArrowRightRotate} />  </div>
                <button className='bth link'> Red Social </button>

                <button className='bth link'>  <Link className='link' to="/favorite"> Favorities </Link>       </button>

                <button className='bth'> <Link className='link' to="/create"> Crear Actividades</Link>  </button>

            </header>
            {/* --------------------------------------------------- */}
            <div className="container1   ">
                <section className="box  car" >

                    {pagina === 1 ? currentCountry.slice(0, 9).map(e => <Card key={suma++} name={e.name}
                        img={e.flag_image} id={e.id} continent={e.continent} population={e.population} capital={e.capital} />) :
                        currentCountry.map(e => <Card key={suma++} name={e.name} img={e.flag_image} id={e.id} capital={e.capital} continent={e.continent} population={e.population} />)}

                    {/* {currentCountry.map(e => <Card key={e.id} name={e.name} img={e.flag_image} id={e.id} continent={e.continent} />)} */}
                </section>
                <aside>
                    <Aside handlefilterAct={handlefilterAct} handlefilterContinent={handlefilterContinent}
                        handleOrderly={handleOrderly} />
                </aside>

            </div>
            {/* --------------------------------------------------- */}
            < div className='paginado' >
                <Paginado sizeArray={sizeArray}
                    allCountries={allCountries.length}
                    paginado={paginado} pagina={pagina}
                    setPagina={setPagina} setSize={setSize} />
            </div>

        </div>


    )
}

export default Home1
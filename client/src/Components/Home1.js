import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCountries, filter_Activities, filter_Continent, orderlyByName, orderlyByPoblation, getCountriesFront } from '../action/index'
import Paginado from './Paginado';
import Card from './Card';
import './Home1.css'
import Aside from './Aside';
import Loader from "./Loader"

const Home1 = () => {

    const allCountries = useSelector((state) => state.countries)

    const dispatch = useDispatch()



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
        console.log(e.target.value)
        if (e.target.value === "act") {
            dispatch(getCountries())
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

            setPagina("1")
        }

        else {
            e.preventDefault();
            dispatch(filter_Continent(e.target.value))
            setPagina("1")

        }

    }

    function handleOrderly(e) {
        if (e.target.value === "default") {
            dispatch(getCountriesFront())

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








    return allCountries.length === 0 ? (<Loader />) : (


        <div className='container'>
            <header>

                <button className='bth'> <Link to="/create"> Crear Actividades</Link>  </button>

            </header>

            < div className='paginado' >
                <Paginado sizeArray={sizeArray}
                    allCountries={allCountries.length}
                    paginado={paginado} pagina={pagina} setPagina={setPagina} setSize={setSize}
                />  </div>

            <div className="container1">
                <section >

                    {pagina === 1 ? currentCountry.slice(0, 9).map(e => <Card key={e.id} name={e.name}
                        img={e.flag_image} id={e.id} continent={e.continent} />) :
                        currentCountry.map(e => <Card key={e.id} name={e.name} img={e.flag_image} id={e.id} continent={e.continent} />)}

                    {/* {currentCountry.map(e => <Card key={e.id} name={e.name} img={e.flag_image} id={e.id} continent={e.continent} />)} */}





                </section>
                <aside>
                    <Aside handlefilterAct={handlefilterAct} handlefilterContinent={handlefilterContinent}
                        handleOrderly={handleOrderly} />
                </aside>

            </div>








        </div>


    )
}

export default Home1
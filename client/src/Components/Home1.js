import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountries, filter_Activities } from '../action/index'
import Paginado from './Paginado';
import Card from './Card';
import './Home1.css'
import Aside from './Aside';


const Home1 = () => {

    const allCountries = useSelector((state) => state.countries)
    console.log(allCountries)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCountries())
    }, [])
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



    return (


        <div className='container'>
            <header>  <h1>Header</h1>  </header>

            < div className='paginado' >
                <Paginado sizeArray={sizeArray}
                    allCountries={allCountries.length}
                    paginado={paginado}
                />   </div>

            <div className="container1">
                <section >
                    {currentCountry.map(e => <Card key={e.id} name={e.name}
                        img={e.flag_image} id={e.id} continent={e.continent} />)}

                </section>
                <aside>
                    <Aside handlefilterAct={handlefilterAct} />
                </aside>

            </div>








        </div>
    )
}

export default Home1
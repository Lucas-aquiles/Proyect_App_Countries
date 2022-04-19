import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getActivities, clearError_Create } from '../action/index'
import Search from './Search';
import ErrorSearch from './ErrorSearch'



const Aside = ({ handlefilterAct, handlefilterContinent, handleOrderly }) => {

    const allActivities = useSelector((state) => state.activities)
    const eSearch = useSelector((state) => state.postmsj)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getActivities())
    }, [])//  eslint-disable-line react-hooks/exhaustive-deps

    function clearError_search() {
        dispatch(clearError_Create())
    }





    var sumador = 1
    return (
        <div>
            <Search />
            {eSearch === "errorSearch" && <ErrorSearch clearError_search={clearError_search} />}

            <select className='slh' onChange={e => handlefilterAct(e)}>
                <option value="act"> Activities</option>

                {allActivities.map((e) => (
                    <option key={sumador++} value={e.name}> {e.name}</option>
                ))}
            </select>


            <select onChange={e => handlefilterContinent(e)}>
                <option value="default" >  Continente</option>
                <option value="Antarctica" > Antartida </option>
                <option value="South America" > America del Sur </option>
                <option value="Asia">  Asia </option>
                <option value="Africa" > Africa </option>
                <option value="Europe" > Europe </option>
                <option value="North America">America del Norte</option>
                <option value="Oceania"> Oceania</option>

            </select>

            <select onChange={e => handleOrderly(e)} >
                <option value="default"> Ordenar por: </option>
                <option value="a_z" > A - Z </option>
                <option value="z_a"> Z - A </option>
                <option value="mayor_p" > Mayor Poblacion</option>
                <option value="menor_p" > Menor Poblacion</option>
            </select>





        </div>
    )
}

export default Aside
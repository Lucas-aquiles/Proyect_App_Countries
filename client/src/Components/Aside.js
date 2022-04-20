import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getActivities, clearError_Create } from '../action/index'
import Search from './Search';
import ErrorSearch from './ErrorSearch'
import './Aside.css'

const Aside = ({ handlefilterAct, handlefilterContinent, handleOrderly }) => {

    const allActivities = useSelector((state) => state.activities)
    const eSearch = useSelector((state) => state.postmsj)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getActivities())
    }, [])//  eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {

        setTimeout(() => {
            dispatch(clearError_Create())
        }, 5000);
    }, [eSearch])





    var sumador = 1
    return (
        <div className='containerAside'>
            <div className="search1"  >
                <Search />
                {eSearch === "errorSearch" && <ErrorSearch className="errorSearch"
                //  clearError_search={clearError_search}
                />}
            </div>

            <div className='select'>
                <select className='slh' onChange={e => handlefilterAct(e)}>
                    <option value="act"> Activities</option>

                    {allActivities.map((e) => (
                        <option key={sumador++} value={e.name}> {e.name}</option>
                    ))}
                </select>
            </div>

            <div className='select'>
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
            </div>

            <div className='select'>
                <select name="format" id="format" onChange={e => handleOrderly(e)} >
                    <option value="default"> Ordenar por: </option>
                    <option value="a_z" > A - Z </option>
                    <option value="z_a"> Z - A </option>
                    <option value="mayor_p" > Mayor Poblacion</option>
                    <option value="menor_p" > Menor Poblacion</option>
                </select>
            </div>





        </div>
    )
}

export default Aside
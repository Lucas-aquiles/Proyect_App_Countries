import React from 'react'
// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCountries } from '../action/index'
import Loader from "./Loader"

import { Link } from 'react-router-dom';


const LandingPage = () => {
    const [init, setInit] = useState(false)

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getCountries());
        setTimeout(() => {
            setInit(true)
        }, 2000);
    }, [])


    return init === false ? (<Loader />) :
        (

            <div>

                <Link to="/home">
                    <button className='bt'>Ingresar</button>
                </Link>


            </div>
        )
}

export default LandingPage
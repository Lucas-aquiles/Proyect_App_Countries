import React from 'react'
// import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCountries } from '../action/index'

import { Link } from 'react-router-dom';


const LandingPage = () => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getCountries())
    })


    return (
        <div>
            <Link to="/home">
                <button className='bt'>Ingresar</button>
            </Link>


        </div>
    )
}

export default LandingPage
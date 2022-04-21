import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCountries } from '../action/index'
import Loader from "./Loader";
import "./LandingPage.css"

import { Link } from 'react-router-dom';


const LandingPage = () => {
    const [init, setInit] = useState(false)

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getCountries());
        setTimeout(() => {
            setInit(true)
        }, 2000);
    }, [])//  eslint-disable-line react-hooks/exhaustive-deps


    return init === false ? (<Loader />) :
        (
            <div className='container_lang'>
                <div className='item_1'>
                    <h1 >Country App</h1>

                    <p>
                        Encuentra paises,
                        crea nuevas actividades ,
                        vamos....
                    </p>
                    <Link to="/home" className='wrap'>
                        <button className='btlp' >Ingresar</button>
                    </Link>
                </div>
                <div className='item_2'>
                    <p>Contact me:</p>
                    <a href="https://www.linkedin.com/in/manuel-lucas-echegaray/" target="_blank" rel="noreferrer"><FontAwesomeIcon className='fa' icon={faLinkedin} /> Linkedin </a>
                    <a href="https://www.instagram.com/l_echegaray/" target="_blank" rel="noreferrer" ><FontAwesomeIcon className='fa' icon={faInstagram} /> Instagram</a>

                </div>
            </div>
        )
}

export default LandingPage
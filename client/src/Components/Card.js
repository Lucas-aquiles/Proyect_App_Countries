import React from 'react';
import { Link } from 'react-router-dom'
import './Card.css'
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { getFavorite } from '../action/index'







export default function Card({ name, img, id, continent, population, capital }) {

    const dispatch = useDispatch()

    function handleFavorite(id) {
        dispatch(getFavorite(id))
    }


    return (

        <div className='container_card clasePrueba'>
            <FontAwesomeIcon onClick={(e) => handleFavorite(id)} className="iconFavorities" icon={faHeart} />
            <div className='container_Card1'>

                <img className='imgCard  clasePrueba' src={img} alt="" />
                <h1 >{name}</h1>
            </div>

            <div className='container_Card2'>
                <div className='card_item_individual'>  <h4>Continent: </h4>  <h4> {continent}</h4>       </div>
                <div className='card_item_individual' >   <h4>Capital:  </h4>  <h4>  {capital}</h4>  </div>
                <div className='card_item_individual1'>  <Link className='linkh4' to={`/details/${id}`}>   <h4 className='h4Card'> More</h4> </Link></div>
            </div>
        </div >





    );
}
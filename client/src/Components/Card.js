import React from 'react';
import { Link } from 'react-router-dom'
import './Card.css'

export default function Card({ name, img, id, continent }) {



    return (

        <div className='container_card'   >

            <img className='imgCard' src={img} alt="" />

            <div>
                <h4 >{name}</h4>
            </div>
            <div> {id}</div>
            <div>{continent}</div>
            <Link to={`/details/${id}`}>   <h4> Aprende mas</h4> </Link>

        </div >





    );
}
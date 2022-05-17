import React from 'react'
import './Loader.css'
import Avion from '../../Images/flight.png'

const Loader = () => {
    return (
        <div className='lds-ellipsis'>

            <div> <img src={Avion} alt=""></img> </div>
            <div> <img src={Avion} alt="" ></img>   </div>
            <div> <img src={Avion} alt="" ></img> </div>
            <div> <img src={Avion} alt="" ></img>  </div>


        </div>
    )
}

export default Loader
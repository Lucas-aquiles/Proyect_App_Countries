import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './Favorite.css'
import Loader from "../Loader/Loader";
import { deletFavorite } from "../../action/index"



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'









const Favorite = () => {

    const [init, setInit] = useState(false)
    const dispatch = useDispatch();

    const allFavorite = useSelector((state) => state.favorites)
    console.log(allFavorite)

    useEffect(() => {
        setTimeout(() => {
            setInit(true)
        }, 3000);

    }, [])//  eslint-disable-line react-hooks/exhaustive-deps


    function handledelet(id) {
        console.log(id)
        dispatch(deletFavorite(id))
    }




    let max = 1

    return init === false ? (<Loader />) : (


        <div className='container_favoritee' >


            <div className="childrenfavorite">
                <div className='container_favorite'>
                    <h1>      Favorite    </h1>

                    <div className='separador'>
                        {allFavorite.map(e =>
                            <div key={max++} className="card2">
                                <h2>{e.id}</h2>
                                {/* <button onClick={(evento) => handledelet(e.id)} >x</button> */}
                                <img src={e.flag_image} alt="" />
                                <h1>  {e.name}  </h1>
                            </div>

                        )}
                    </div>
                </div>
                <div className='rompeolas'>
                    <Link to="/home" >
                        <FontAwesomeIcon className="FavoriteIcon" icon={faAngleLeft} />  </Link>
                </div>
            </div>



            <div className='parte1'> </div>
            <div className='parte2' >    </div>
            <div className='parte3' >     </div>



















        </div>
    )
}

export default Favorite
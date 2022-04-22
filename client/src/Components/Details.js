import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { callId, clearDetails } from "../action/index"
import Loader from "./Loader";
import './Details.css'
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'



const Details = () => {

    const dispatch = useDispatch();
    const params = useParams();
    let addres = params.id;
    console.log(addres)
    const dateDetails = useSelector((state) => state.details)
    console.log(dateDetails)
    const [init, setInit] = useState(false)



    useEffect(() => {

        dispatch(callId(addres))
        setTimeout(() => {
            setInit(true)
        }, 2000);


        return () => {
            dispatch(clearDetails())
        }
    }, [])//  eslint-disable-line react-hooks/exhaustive-deps



    function handleClick() {

    }



    let sumar = 1

    return init === false ? (<Loader />) : (
        <div className="containerDetails">

            <div className="item_1Details">
                <div className="children">
                    <img src={dateDetails[0].flag_image} alt="" ></img>

                    <h1> {dateDetails[0].name}</h1>
                </div>
                <div className="children1">
                    <h4> Codigo:  {addres} </h4>
                    <h4>Capital: {dateDetails[0].capital} </h4>
                    <h4>Continent: {dateDetails[0].continent} </h4>
                    <h4>Area: {dateDetails[0].area} km2 </h4>
                    <h4>Population: {dateDetails[0].population} habitantes </h4>
                </div>
            </div>
            <div className="item_2Details">
                <div className="icon" onClick={e => handleClick(e)}  >
                    <Link to="/home" >
                        <FontAwesomeIcon className="iconFont" icon={faAngleLeft} />  </Link>          </div>
                <div className="father">

                    {dateDetails[0].activities.length >= 1 ? (<h1>Activities:</h1>) : null}
                    {dateDetails[0].activities.map(elemento =>
                        <div className="boy" key={sumar++}>
                            <h4>  Activity : {elemento.name}        </h4>
                            <h4> Difficulty :  {elemento.difficulty === 1 ? "Very Difficult" : null}
                                {elemento.difficulty === 2 ? " Hard" : null}
                                {elemento.difficulty === 3 ? "Middle" : null}
                                {elemento.difficulty === 4 ? "Normal" : null}
                                {elemento.difficulty === 5 ? " Easy" : null}

                            </h4>



                            <h4> Duration :  {elemento.duration} hs     </h4>
                            <h4>  Season : {elemento.season.map(e => {
                                if (e === "Winter") {
                                    return (e + "☃️.")
                                }
                                if (e === "Summer") {
                                    return (e + "☀️.")
                                }
                                if (e === "Spring") {
                                    return (e + "🌺.")
                                }
                                if (e === "Autumn") {
                                    return (e + "🍁.")
                                }
                            }
                            )}      </h4>

                        </div>



                    )}
                </div>

            </div>


        </div>
    )
}

export default Details
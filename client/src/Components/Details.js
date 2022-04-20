import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { callId } from "../action/index"
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

    console.log(dateDetails)
    useEffect(() => {

        dispatch(callId(addres))

    }, [])






    let sumar = 1

    return dateDetails.length === 0 ? (<Loader />) : (
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
                <div className="icon">
                    <Link to="/home" >
                        <FontAwesomeIcon className="iconFont" icon={faAngleLeft} />  </Link>          </div>
                <div className="father">

                    {dateDetails[0].activities.length === 1 ? (<h1>Activities</h1>) : null}
                    {dateDetails[0].activities.map(elemento =>
                        <div className="boy" key={sumar++}>
                            <h4>  Activity : {elemento.name}        </h4>
                            <h4> Difficulty :  {elemento.difficulty}      </h4>
                            <h4> Duration :  {elemento.duration} hs     </h4>
                            <h4>  Season : {elemento.season.map(e => {
                                if (e === "Winter") {
                                    return (e + "☃️.")
                                }
                                if (e === "Summer") {
                                    return (e + "☀️.")
                                }
                                if (e === "Pring") {
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
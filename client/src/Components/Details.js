import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { callId } from "../action/index"
import Loader from "./Loader";



const Details = () => {

    const dispatch = useDispatch();
    const params = useParams();
    let addres = params.id;
    console.log(addres)
    const dateDetails = useSelector((state) => state.details)
    console.log(dateDetails)
    useEffect(() => {

        dispatch(callId(addres))

    }, [])








    return dateDetails.length === 0 ? (<Loader />) : (
        <div>    Details
            <h1> {dateDetails[0].name}</h1>
            <img src={dateDetails[0].flag_image}  ></img>
            <h4> {addres} </h4>
            <h4> {dateDetails[0].capital} </h4>
            <h4> {dateDetails[0].continent} </h4>
            <h5>{dateDetails[0].sub_region}</h5>
            <h4> {dateDetails[0].area}km2 </h4>
            <h4> {dateDetails[0].population} habitantes </h4>
            <h4>  {dateDetails[0].activities.map(elemento => elemento.name + "  ")}   </h4>


        </div>
    )
}

export default Details
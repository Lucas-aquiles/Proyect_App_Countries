import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getActivities } from '../action/index'





const Aside = ({ handlefilterAct }) => {

    const allActivities = useSelector((state) => state.activities)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getActivities())
    }, [])



    var sumador = 1
    return (
        <div>

            <select className='slh' onChange={e => handlefilterAct(e)}>
                <option value="act"> Activities</option>

                {allActivities.map((e) => (
                    <option key={sumador++} value={e.name}> {e.name}</option>
                ))}
            </select>

        </div>
    )
}

export default Aside
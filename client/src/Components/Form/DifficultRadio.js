import React from 'react'

const DifficultRadio = ({ cambioDifficult, inputd }) => {



    var array = [{ name: "Very difficult", id: "1" }, { name: "Hard ", id: "2" }, { name: "Middle", id: "3" }, { name: "Normal", id: "4" }, { name: "Easy", id: "5" }]


    return (
        <div>
            <p>{inputd[0]}</p>

            {array.map(e =>
                <label key={e.id} >
                    <input
                        id={e.id}
                        type="radio"
                        value={e.name}
                        onChange={cambioDifficult}
                        name={e.name}

                        checked={inputd[1] === e.id ? true : false}

                    />
                    <span id={e.id}>
                        {e.name}
                    </span>
                </label>
            )
            }




        </div>
    )
}

export default DifficultRadio
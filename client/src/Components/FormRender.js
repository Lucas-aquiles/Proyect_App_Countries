import React, { useState, useEffect } from 'react'
import './FormRender.css'




const FormRender = () => {
    const [isChecked, setIsChecked] = useState(
        (arrayDifficul).fill(false)
    );

    // const [checkedState, setCheckedState] = useState(
    //     new Array(toppings.length).fill(false)
    // );


    // ---------------------------------------------------------
    const [input, setInput] = useState({
        name: " ",
        difficult: " ",
        duration: " ",
        season: " ",
        countries: [],
    })

    useEffect(() => {



    }, [])







    function handleChange(e) {
        e.preventDefault()



        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    // ----------------------------------------------
    const handleOnChange = (e) => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        } else {
            setInput({
                ...input,
                [e.target.name]: ""
            })
        }

    }
    var arrayDifficul = ["Muy Dificil", "Dificil", "Intermedio", "Normal", "Facil"]
    // ----------------------------------------------

    return (
        <div >
            < form name='formu'
            //  onSubmit={e => handleSubmit(e)}
            >
                <label>Nombre:
                    <input type="text"
                        name="name"
                        placeholder="Nombre"
                        value={input.name}
                    // onChange={e => handleChange(e)}
                    />


                </label>


                <label >Dificultad:
                    {arrayDifficul.map((elemento) => {
                        return (
                            <input type="checkbox" name="difficult" value={elemento}
                                checked={isChecked}
                                onChange={e => handleOnChange(e)}
                            />)
                    }
                    )}


                </label>







                <label >Duration:

                    <input type="number"
                        name="duration"
                        value={input.duration}
                        // placeholder="Rating"
                        max={5}
                        min={0}
                    /></label>

                <label >Season:
                    <input type="text"
                        name="season"
                        value={input.season}
                        // placeholder="Rating"
                        max={5}
                        min={0}
                    /></label>

                <label>Countries:
                    <select name={input.country} >
                        <optgroup label="Countries">

                        </optgroup>

                    </select>
                </label>

                <button type='submit' >  Crear Country </button>


            </form >
        </div >






    )
}

export default FormRender
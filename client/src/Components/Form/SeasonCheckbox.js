import React from 'react'

const SeasonCheckbox = ({ inputs, setInput, input }) => {

    let estaciones = [
        { id: 1, name: ' Winter  ☃️' }, { id: 2, name: ' Summer  ☀️' }, { id: 3, name: ' Pring  🌺' },
        { id: 4, name: ' Autumn  🍁' },
    ]



    // 🍰

    function onChange(id) {

        let selected = inputs
        let find = selected.findIndex(item => item.id === id)
        if (find > -1) {
            selected.splice(find, 1)
        } else {
            // We can use find to get the item based on its id
            selected.push(estaciones.find(item => item.id === id))
        }
        setInput({
            ...input,
            season: selected
        })

    }



    // handleCheckbox(arr.selected)

    // handleCheckbox(1)



    return (
        <>

            <p>
                {inputs.map(e => { return e.name })}
            </p>
            <p>Season : </p>
            {
                estaciones.map(item => {
                    return (
                        <label key={item.id}>
                            <input type="checkbox"
                                onChange={() => onChange(item.id)}
                                selected={inputs.includes(item.id)}

                            ></input>

                            <span>{item.name}</span>
                        </label>
                    )
                })
            }

        </>



    )
}

export default SeasonCheckbox
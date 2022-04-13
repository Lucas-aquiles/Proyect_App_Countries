import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCountry } from '../action/index';



const Search = () => {


    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        setName({ ...name });
        dispatch(searchCountry(name));
        setName("")
    }


    return (
        <div>
            <form >
                <label>Click me  <input type="text" onChange={(e) => handleInputChange(e)}
                    value={name} placeholder='Buscar Video Games......' />    </label>

                <button type="submit" onClick={(e) => handleSubmit(e)}   >BUSCAR...</button>

            </form>

        </div>
    )
}

export default Search
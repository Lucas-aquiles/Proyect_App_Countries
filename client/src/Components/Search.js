import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCountry } from '../action/index';
import './Search.css'


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
        <div className='containerSearch'>
            <form >
                <label className='label_form'> <input type="text" onChange={(e) => handleInputChange(e)}
                    value={name} placeholder='Buscar Video Games......' />    </label>

                <button className='button_form' type="submit" onClick={(e) => handleSubmit(e)}   >Buscar...</button>

            </form>

        </div>
    )
}

export default Search
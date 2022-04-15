import React, { useState, useEffect } from 'react'
import DifficultRadio from './DifficultRadio'
import SeasonCheckbox from './SeasonCheckbox'
// import SearchForm from './searchForm'
import { useSelector, useDispatch } from 'react-redux'
import { searchFilter } from '../../action/index'
import './FormRender.css'

const FormRender = () => {
  const dispacth = useDispatch()
  const data = useSelector((state) => state.searchForm)




  const [ver, setVer] = useState("")

  const [input, setInput] = useState({
    name: "",
    season: [],
    difficult: "",
    duration: "",
    countries: []

  })


  useEffect(() => {
  }, [input.season])


  function handleChange(e) {
    setInput({
      ...input, [e.target.name]: e.target.value
    })

  }

  function cambioDifficult(e) {
    // setInput({ difficult: e.target.value });
    setInput({
      ...input,
      difficult: (e.target.value)
    })
  }
  // function handleSubmit(e) {
  //   console.log(1)
  // }
  function inputSearch(e) {
    e.preventDefault()

    setVer(e.target.value)


  }

  function sendDis(e) {
    e.preventDefault()
    dispacth(searchFilter(ver))
  }


  function addCountries(e) {
    e.preventDefault()

    if (!input.countries.includes(e.target.value)) {
      setInput({
        ...input,
        countries: input.countries.concat(e.target.value)
      })
    }
  }
  function deleteEve(e) {
    e.preventDefault()

    var lets = "1" + e.target.value
    var tra = lets.slice(1)

    setInput({
      ...input,
      countries: input[e.target.name].filter((e) => e !== tra)
    })

  }







  let sumador = 1

  return (

    <div>


      <form
      // onSubmit={e => handleSubmit(e)} 
      >

        <SeasonCheckbox input={input} setInput={e => setInput(e)} inputs={input.season} />

        {/* ----------------------------------------------------------------------------- */}

        <DifficultRadio cambioDifficult={e => cambioDifficult(e)} input={input.difficult} />

        {/* ---------------------------------------------------------- */}
        <label>Nombre:
          <input type="text"
            name="name"
            placeholder="Nombre"
            value={input.name}
            onChange={e => handleChange(e)}
          />
        </label>
        {/* ------------------------------------------------------------- */}
        <label >Duration:
          <input type="number" name="duration" value={input.duration} max={5} min={0}
            onChange={e => handleChange(e)}

          /></label>
        {/* ---------------------------------------------------------------- */}
        {/* < SearchForm auxinput={auxinput} setAuxinput={setAuxinput} /> */}

        <div>
          <input type="text" name='name' value={ver} onChange={inputSearch} />
          <button onClick={sendDis}>O</button>
          {data && data.map(e =>
            <div key={e.id} className='searchfilter'>
              <h5  >  {e.name} </h5>
              <img className='imgForm' src={e.flag_image} alt="" />
              <button value={e.name} onClick={(e) => addCountries(e)}    >+</button>
            </div>
          )}

          {input.countries?.map(elemento =>
            <div key={sumador++}>
              <p>  {elemento} </p>
              <button name="countries" value={elemento} onClick={e => deleteEve(e)}  >x</button>


            </div>
          )
          }











        </div>














        <button type='submit'>  Crear Actividades </button>
      </form>



    </div>
  )
}

export default FormRender

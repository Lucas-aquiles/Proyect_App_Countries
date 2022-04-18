import React, { useState, useEffect } from 'react'
import DifficultRadio from './DifficultRadio'
import SeasonCheckbox from './SeasonCheckbox'
// import SearchForm from './searchForm'
import { useSelector, useDispatch } from 'react-redux'
import { searchFilter, postActivities, clearActivities, clearError_Create } from '../../action/index'
import './FormRender.css'
import Error from './Error'
import Creado from './Creado'

const FormRender = () => {
  const dispacth = useDispatch()
  const msjPost = useSelector((state) => state.postmsj)
  console.log(msjPost.data)
  // if (msjPost.data.error) {
  //   console.log("ERorrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
  // }
  const dataSearch = useSelector((state) => state.searchForm)
  const [serchAux, setSearchAux] = useState(false)
  console.log(serchAux)
  const [ver, setVer] = useState("")

  const [input, setInput] = useState({
    name: "",
    season: [],
    difficulty: [],
    duration: "",
    country: []

  })
  useEffect(() => {
    setTimeout(() => {
      setSearchAux(false)
    }, 2000);
  }, [serchAux])

  useEffect(() => {
  }, [input.season])


  function handleChange(e) {
    e.preventDefault()
    setInput({
      ...input, [e.target.name]: e.target.value
    })

  }

  function cambioDifficult(e) {
    // e.preventDefault()
    // setInput({ difficult: e.target.value });
    setInput({
      ...input,
      difficulty: [(e.target.value), (e.target.id)]
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
    setVer("")
    if (dataSearch.length === 0) {
      setSearchAux(!serchAux)
    }
  }


  function addCountries(e) {
    e.preventDefault()

    if (!input.country.includes(e.target.value)) {
      setInput({
        ...input,
        country: input.country.concat(e.target.value)
      })
    }
  }
  function deleteEve(e) {
    e.preventDefault()
    var str = String(e.target.value)
    // var lets = "1" + e.target.value
    // var tra = lets.slice(1)
    setInput({
      ...input,
      country: input[e.target.name].filter((e) => e !== str)
    })
  }
  // ----------------------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    if ((input.name === "" || input.season.length === 0 || input.difficulty === " " || input.duration === " " || input.country.length === 0)) {
      return alert("No se puede enviar , complete las categorias");
    } else {

      dispacth(postActivities(input));
      setInput({
        name: " ",
        difficulty: [],
        season: [],
        duration: "",
        country: [],
      })
    }
    dispacth(clearActivities())

  }
  function clearError_creado(e) {
    dispacth(clearError_Create())
  }



  let sumador = 1

  return (

    <div>

      {msjPost.data === "ERROR" && <Error clearError_creado={clearError_creado} />
      }
      {msjPost.data === "Creado" && <Creado clearError_creado={clearError_creado} />}





      <form onSubmit={e => handleSubmit(e)} >

        <SeasonCheckbox input={input} setInput={e => setInput(e)} inputs={input.season} />

        {/* ----------------------------------------------------------------------------- */}

        <DifficultRadio cambioDifficult={e => cambioDifficult(e)} inputd={input.difficulty} />

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

          {dataSearch.length === 0 && serchAux ? "No encontrado" : dataSearch.map(e =>
            <div key={e.id} className='searchfilter'>
              <h5  >  {e.name} </h5>
              <img className='imgForm' src={e.flag_image} alt="" />
              <button value={e.name} onClick={(e) => addCountries(e)}    >+</button>
            </div>
          )}

          {input.country && input.country.map(elemento =>
            <div key={sumador++}>
              <p>  {elemento} </p>
              <button name="country" value={elemento} onClick={e => deleteEve(e)}  >x</button>


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

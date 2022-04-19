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
  // console.log(msjPost.data)
  // if (msjPost.data.error) {
  //   console.log("ERorrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
  // }
  const dataSearch = useSelector((state) => state.searchForm)
  const [serchAux, setSearchAux] = useState(false)
  // console.log(serchAux)
  const [ver, setVer] = useState("");
  let [error, setError] = useState('');
  let [error1, setError1] = useState('');
  // console.log(error)
  console.log(error1)

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

  useEffect(() => {
    setError(validate(input));
    // return () => {
    // };

  }, [input])

  useEffect(() => {
    setError1(validate1(ver));
    // return () => {
    // };

  }, [ver])




  // ------------------------------------------------------
  function handleChange(e) {
    e.preventDefault()
    setInput({
      ...input, [e.target.name]: e.target.value
    })
    let objError = validate({ ...input, [e.target.name]: e.target.value });
    setError(objError);
  }
  // ------------------------------------------------------------
  function cambioDifficult(e) {
    // e.preventDefault()
    // setInput({ difficult: e.target.value });
    setInput({
      ...input,
      difficulty: [(e.target.value), (e.target.id)]
    })
    let objError = validate({ ...input, difficulty: e.target.value });
    setError(objError);
  }
  // function handleSubmit(e) {
  //   console.log(1)
  // }
  // ------------------------------------------------
  function inputSearch(e) {
    e.preventDefault()
    setVer(e.target.value)
    let objError = validate1(...ver, e.target.value);
    setError1(objError);

  }

  function sendDis(e) {
    e.preventDefault()
    dispacth(searchFilter(ver))
    if (dataSearch.length === 0) {
      setSearchAux(!serchAux)
    }
  }
  // -------------------------------------------

  function addCountries(e) {
    e.preventDefault()

    if (!input.country.includes(e.target.value)) {
      setInput({
        ...input,
        country: input.country.concat(e.target.value)
      })
    }
    let objError = validate({ ...input, country: e.target.value });
    setError(objError);

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
    };
    setVer("")

    dispacth(clearActivities())

  }
  function clearError_creado(e) {
    dispacth(clearError_Create())
  }
  //------------------



  function validate(input) {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexDuration = /^[0-5]$/;
    let formularioValidado = true;

    if (!input.name) {
      formularioValidado = false;
      errors.name = 'Nombre es requerido';
    } else if (!regexName.test(input.name.trim())) {
      formularioValidado = false;
      errors.name = "solo acepta letras y espacios en blanco";
    }

    if (!input.duration) {
      formularioValidado = false;
      errors.duration = "Duration es requerido"
    } else if (!regexDuration.test(input.duration.trim())) {
      formularioValidado = false;
      errors.duration = "Duration es requerido , del 0 al 5";
    }

    if (input.season.length === 0) {
      formularioValidado = false;
      errors.season = "Season es requerido"
    }
    if (input.difficulty.length === 0) {
      formularioValidado = false;
      errors.difficulty = "Difficulty es requerido"
    }
    if (input.country.length === 0) {
      formularioValidado = false;
      errors.country = "Country es requerido"
    }



    // if (Object.keys(errors).length === 0) {
    //   setBotonActivo(formularioValidado)
    // } else { setBotonActivo(false) }

    return errors;
  };
  function validate1(ver) {
    // let regexNameSearch = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    console.log(ver)
    let errors1 = " "

    if (!ver) {
      errors1 = 'Busque un pais';

    }
    // else if (!regexNameSearch.test(ver)) {
    //   errors1 = "solo acepta letras y espacios en blanco";
    // }
    console.log(errors1)
    return errors1
  }




  // --------------------
  let sumador = 1

  return (

    <div>

      {msjPost.data === "ERROR" && <Error clearError_creado={clearError_creado} />
      }
      {msjPost.data === "Creado" && <Creado clearError_creado={clearError_creado} />}





      <form onSubmit={e => handleSubmit(e)} >

        <SeasonCheckbox input={input} setInput={e => setInput(e)} inputs={input.season} setError={setError} validate={validate} />

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

import React, { useState, useEffect } from 'react'
import DifficultRadio from './DifficultRadio'
import SeasonCheckbox from './SeasonCheckbox'
// import SearchForm from './searchForm'
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { searchFilter, postActivities, clearActivities, clearError_Create } from '../../action/index'
import './FormRender.css'
import Error from './Error'
import Creado from './Creado'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import Loader from '../Loader/Loader';


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
  // console.log(error1)
  const [init, setInit] = useState(false)

  const [input, setInput] = useState({
    name: "",
    season: [],
    difficulty: [],
    duration: "",
    country: []

  })
  // console.log(input.country)
  useEffect(() => {
    setTimeout(() => {
      setSearchAux(false)
    }, 2000);


  }, [serchAux])

  useEffect(() => {

    setTimeout(() => {
      setInit(true)
    }, 2000);

  }, [])


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

    if (!input.name) {
      errors.name = 'Nombre es requerido';
    } else if (!regexName.test(input.name.trim())) {
      errors.name = "solo acepta letras y espacios en blanco";
    }

    if (!input.duration) {
      errors.duration = "Duration es requerido"
    } else if (!regexDuration.test(input.duration.trim())) {
      errors.duration = "Duration es requerido , del 0 al 5";
    }

    if (input.season.length === 0) {
      errors.season = "Season es requerido"
    }
    if (input.difficulty.length === 0) {
      errors.difficulty = "Difficulty es requerido"
    }
    if (input.country.length === 0) {
      errors.country = "Country es requerido"
    }



    // if (Object.keys(errors).length === 0) {
    //   setBotonActivo(formularioValidado)
    // } else { setBotonActivo(false) }

    return errors;
  };
  function validate1(ver) {
    // let regexNameSearch = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let errors1 = " "

    if (!ver) {
      errors1 = 'Busque un pais';

    }
    // else if (!regexNameSearch.test(ver)) {
    //   errors1 = "solo acepta letras y espacios en blanco";
    // }
    return errors1
  }




  // --------------------
  let sumador = 1
  return init === false ? (<Loader />) : (


    <div className='father_form'>

      {msjPost.data === "ERROR" && <Error clearError_creado={clearError_creado} />
      }
      {msjPost.data === "Creado" && <Creado clearError_creado={clearError_creado} />}

      <form className='container_Formulario' onSubmit={e => handleSubmit(e)} >
        <div className='item_containerFormulario' >
          <label>Nombre:
            <input className='inputformulario' type="text"
              name="name"
              placeholder="Nombre"
              value={input.name}
              onChange={e => handleChange(e)}
            />
          </label>
          {error.name && (<p className='error_p'>{error.name} </p>)}


          {/* ------------------------------------------------------------- */}
          <label >Duration , h. :
            <input className='inputformulario' type="number" name="duration" value={input.duration} max={5} min={0}
              onChange={e => handleChange(e)}

            /></label>
          {error.duration && (<p className='error_p'>{error.duration} </p>)}

          {/* ---------------------------------------------------------------- */}
          {/* < SearchForm auxinput={auxinput} setAuxinput={setAuxinput} /> */}

          <SeasonCheckbox input={input} setInput={e => setInput(e)} inputs={input.season} setError={setError}
            validate={validate} />
          {error.season && (<p className='error_p'>{error.season} </p>)}


          {/* ----------------------------------------------------------------------------- */}

          <DifficultRadio cambioDifficult={e => cambioDifficult(e)} inputd={input.difficulty} />
          {error.difficulty && (<p className='error_p'>{error.difficulty} </p>)}


          {/* ---------------------------------------------------------- */}
        </div>

        <div className='item_containerFormulario1'>
          <div className='padratro'>
            <input type="text" name='name' value={ver} onChange={inputSearch} placeholder="Country Search" />
            <button className='buton_padrastro' onClick={sendDis}>Search</button>
          </div>
          {/* {console.log(dataSearch)} */}
          {dataSearch.length === 0 && serchAux ? <p className='error_p'> "No encontrado"  </p> : dataSearch.map(e =>
            <div key={e.id} className='searchfilter'>
              <div className='searchFF'> <img className='imgForm' src={e.flag_image} alt="" /></div>
              <div className='searchFF' > <h5  >  {e.name} </h5> </div>
              <div className='searchFF'   >      <button value={e.name} onClick={(e) => addCountries(e)}    > +</button>  </div>


            </div>
          )}
          {error1 && (<p className='error_p'>{error1} </p>)}


          {input.country && input.country.map(elemento =>
            <div className='addCountry' key={sumador++}>
              <p>  {elemento} </p>
              <button name="country" value={elemento} onClick={e => deleteEve(e)}  >x</button>


            </div>
          )
          }


          <button className='form_sumit' type='submit'>  Crear Actividades </button>
        </div>

      </form>

      <div className="icon">
        <Link to="/home" >
          <FontAwesomeIcon className="iconFont" icon={faAngleLeft} />  </Link>          </div>

    </div>
  )
}

export default FormRender

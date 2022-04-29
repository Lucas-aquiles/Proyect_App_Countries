


const initialState = {
    countries: [],
    countriesAux: [],
    activities: [],
    searchForm: [],
    postmsj: [],
    details: [],
    favorites: [],
    searchIntermedio: []
}
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_COUNTRIES":
            return {
                ...state,
                countries: action.payload,

                countriesAux: action.payload
            };

        case 'FILTER_ACTIVITIES':

            const notdata = [{ name: "No encontrado" }]

            const countryState = state.countries
            // .length === 0 ? notdata : state.countries
            let paisFiltrado = countryState[0].activities === undefined ? notdata : countryState.filter(el => el.activities.find(e => e.name === action.payload))
            console.log(paisFiltrado)


            return {

                ...state,
                countries: paisFiltrado.length === 0 || undefined ? notdata : paisFiltrado

            };

        case "GET_ACTIVITY":
            // let arrayActivity = [{ name: "Rafting" }, { name: "Sky" }, { name: "Camino del Vino" }, { name: "Gastronomia local" }]
            let totalAct = action.payload
            return {
                ...state,
                activities: totalAct,
            };

        case "FILTER_CONTINENT":
            const statecountry = state.countriesAux
            const filterContinente = statecountry.filter(e => e.continent === action.payload)
            return {
                ...state,
                countries: filterContinente,
            };


        case "ORDELY_NAME":
            let sortName = action.payload === "a_z" ?

                state.countries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1
                    }
                    return 0;
                });

            return {
                ...state,
                countries: sortName

            };



        case "ORDELY_POBLATION":

            let sortPoblation = action.payload === "menor_p" ?

                state.countries.sort(function (a, b) {
                    if (a.population > b.population) {
                        return 1;
                    }
                    if (b.population > a.population) {
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) {
                        return -1;
                    }
                    if (b.population > a.population) {
                        return 1
                    } return 0;
                });

            return {
                ...state,
                countries: sortPoblation

            };



        case "SEARCH_COUNTRY":

            const notdat = [{ name: ['No encontrado'], id: "4d4" }]
            console.log(action.payload)
            return {
                ...state,
                countries: action.payload.length === 0 ? notdat : action.payload
            };


        case 'GET-COUNTRIES_FRONT':
            const stateAux = state.countriesAux
            return {
                ...state,
                countries: stateAux
            };
        case "SEARCH_FILTER":
            const firstfilt = action.payload.trim()
            const str = firstfilt.charAt(0).toUpperCase() + firstfilt.slice(1)
            const auxState = state.countriesAux
            const filterCounry = auxState.filter(e => e.name.slice(0, 2) === str.slice(0, 2))

            return {
                ...state,
                searchForm: filterCounry

            }

        case "SEND_POST":
            return {
                ...state,
                postmsj: action.payload,

            };
        case "CLEAR_ACTIVITIES":
            return {
                ...state,
                searchForm: action.payload
            }


        case "CLEAR_ERROR_CREATE":
            return {
                ...state,
                postmsj: action.payload
            }


        case 'ERROR_SEARCH':
            return {
                ...state,
                postmsj: action.payload
            }




        case "CALL_ID":
            return {
                ...state,
                details: action.payload,
            }
        case "CLEAR_DETAILS":
            return {
                ...state,
                details: action.payload
            }

        case "CLEAR_COUNTRIES":
            return {
                ...state,
                countries: action.payload,
                countriesAux: action.payload
            }



        case "GET_FAVORITE":
            const statetotal = state.countriesAux
            const stateFavorite = state.favorites
            const vera = stateFavorite.find(e => e.id === action.payload)
            //si vera es false , quiero q los filter el total con el id 
            const mirar = vera === undefined && statetotal.filter(e => e.id === action.payload)
            return {
                ...state,
                favorites: mirar ? state.favorites.concat(mirar) : state.favorites
            }



        default:
            return {
                ...state
            }
    }
};
export default rootReducer
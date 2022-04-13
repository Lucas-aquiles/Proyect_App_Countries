


const initialState = {
    countries: [],
    countriesAux: [],
    activities: []
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

            const notdata = [{ name: 'No encontrado', id: "2d2", activities: "nada" }]

            const countryState = state.countries.length === 0 ? notdata : state.countries


            const paisFiltrado = countryState.filter(el => el.activities.includes(action.payload))


            console.log(paisFiltrado)
            return {

                ...state,
                countries: paisFiltrado.length === 0 ? notdata : paisFiltrado

            };

        case "GET_ACTIVITY":
            let arrayActivity = [{ name: "Rafting" }, { name: "Sky" }, { name: "Camino del Vino" }, { name: "Gastronomia local" }]
            let totalAct = action.payload.concat(arrayActivity)
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

            return {
                ...state,
                countries: action.payload.length === 0 ? notdat : action.payload
            }
                ;


        case 'GET-COUNTRIES_FRONT':
            const stateAux = state.countriesAux
            return {
                ...state,
                countries: stateAux
            };




        default:
            return {
                ...state
            }
    }
};
export default rootReducer
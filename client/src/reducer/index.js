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













        default:
            return {
                ...state
            }
    }
};
export default rootReducer
const axios = require('axios')


export function getCountries() {
    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/countries')
        // console.log("aaaaa", json.data, "aaaaa")
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
}


export function filter_Activities(payload) {
    return {
        type: 'FILTER_ACTIVITIES',
        payload
    }
}



export function getActivities() {
    return function (dispatch) {
        try {
            return fetch("http://localhost:3001/activities")
                .then(response => response.json())
                .then(activity => {
                    dispatch({
                        type: "GET_ACTIVITY", payload: activity
                    });
                })
        } catch (error) {
            throw new Error(error)
        }
    };


}








// "@fortawesome/fontawesome-svg-core": "^6.1.1",
//     "@fortawesome/free-brands-svg-icons": "^6.1.1",
//     "@fortawesome/free-regular-svg-icons": "^6.1.1",
//     "@fortawesome/free-solid-svg-icons": "^6.1.1",
//     "@fortawesome/react-fontawesome": "^0.1.18"
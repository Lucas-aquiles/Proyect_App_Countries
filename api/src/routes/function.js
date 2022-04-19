require('dotenv').config();
const axios = require('axios');
const { API } = process.env;
const { Country, Activity, actArray } = require('../db');



const allCountries = async () => {
    const apiUrl = await axios.get(API)
    const resultMap = apiUrl.data.map(e => {
        return {
            name: e.name.common,
            id: e.cca3,
            //  e.cca3 : e.cioc,
            flag_image: e.flags[0],
            continent: e.continents[0],
            capital: e.capital ? e.capital[0] : "no encontrado",
            sub_region: e.subregion,
            area: e.area,
            population: e.population

        }
    })
    await Country.bulkCreate(resultMap);

    // --------------------------------------------------------------
    //  resultMap.forEach(async (e) => {
    //     await Country.create({
    //         name: e.name,
    //         id: e.id,
    //         flag_image: e.flag_image,
    //         continent: e.continent,
    //         capital: e.capital,
    //         sub_region: e.sub_region,
    //         area: e.area,
    //         population: e.population
    //     });
    // });
    // ---------------------------------------------------------------------------

}


// const loadActivities = async () => {

//     const saveActivities = actArray.map(e => {
//         return {
//             name: e,
//         }
//     })
//     saveActivities.forEach(el => {
//         Activity.findOrCreate({
//             where: { name: el.name }
//         })
//     })

// }
// ----------------------------------
const validarActivity = async (name, country) => {

    const coincidir = await Country.findAll({

        where: {
            name: country
        }, include: {
            model: Activity,
            attributes: { name: name }

        }
    })

    if (coincidir[0].activities) {

        let rC = coincidir[0].activities
        let aB = rC.map(e => e.name)

        await aB.forEach(element => {
            if (element === name) {
                throw new Error(` el pais ${country} ya contiene la actividad: ${name}`)
            }
        });
    }
}


module.exports = {
    allCountries,
    validarActivity,
    // loadActivities
};
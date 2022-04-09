const express = require('express');

const axios = require('axios');

const server = require("express").Router();
const API = "https://restcountries.com/v3/all"

const { Country, Activity } = require('../db');


//encoding UTF8
server.get('/', async (req, res) => {
    const apiUrl = await axios.get(API)
    const resultMap = apiUrl.data.map(e => {
        return {
            name: e.name.common,
            id: e.ccn3 ? e.ccn3 : e.cioc,
            flag_image: e.flags[0],
            continent: e.continents[0],
            capital: e.capital ? e.capital[0] : "no encontrado",
            sub_region: e.subregion,
            area: e.area,
            population: e.population

        }
    })

    await Country.bulkCreate(resultMap);




    // resultMap.forEach(async (e) => {
    //     await Country.findOrCreate({
    //         where: {
    //             name: e.name,
    //             id: e.id,
    //             flag_image: e.flag_image,
    //             continent: e.continent,
    //             capital: e.capital,
    //             sub_region: e.sub_region,
    //             area: e.area,
    //             population: e.population
    //         },
    //         defaults: {
    //             name: e.name,

    //         }
    //     });



    // });



    res.status(200).send("send")
})

module.exports = server;

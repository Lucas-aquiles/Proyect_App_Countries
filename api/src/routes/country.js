const express = require('express');
require('dotenv').config();
const axios = require('axios');
const { API } = process.env;
const server = require("express").Router();
// const API = "https://restcountries.com/v3/all"
const { allCountries, loadActivities } = require("./function");
const { Country, Activity, actArray } = require('../db');


//encoding UTF8
server.get('/', async (req, res) => {

    - GET https://restcountries.com/v3/name/{name}


    const nameCountry = req.query.name

    if (nameCountry) {
        const resultName = await Country.findAll({
            where: { name: nameCountry },
        })

        // resultName.hasOwnProperty("status") ? res.status(200).send("No se encontro") :
        res.status(200).json(resultName)
    }
    // -------------------------------------------------------
    const countriesState = await Country.findAll()
    if (countriesState.length === 0) {
        await allCountries();
        await loadActivities();

        const dbInfo = await Country.findAll({
            include: {
                model: Activity
            }
        })

        res.status(200).json(dbInfo)
    } else {
        res.status(200).json(countriesState)
    }

})
// ----------------------------------------------------------------------------------------------

server.get('/:id', (req, res) => {

    let idPais = req.params.id

    // const idBd = await
    Country.findAll({
        where: { id: idPais },
        include: {
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through: {
                attributes: []
            }
        }
    }
    ).then(respuesta => res.status(200).json(respuesta))
    // -----------------------------
    // res.status(200).json(idBd)
})




module.exports = server;



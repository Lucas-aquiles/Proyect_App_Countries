const express = require('express');
require('dotenv').config();
const axios = require('axios');
const { API, API_NAME } = process.env;
const server = require("express").Router();
// const API = "https://restcountries.com/v3/all"
const { allCountries, loadActivities } = require("./function");
const { Country, Activity, actArray } = require('../db');

//encoding UTF8
server.get('/', async (req, res) => {

    const nameCountry = req.query.name
    if (nameCountry) {
        try {
            const resultApi = await axios.get(API_NAME + nameCountry)
            const resultAxios = resultApi.data
            const sendSearch = resultAxios.map(e => {
                return {
                    name: e.name.common,
                    id: e.cca3,
                    continent: e.continents[0],
                    flag_image: e.flags[0],
                    population: e.population,
                    capital: e.capital ? e.capital : "no encontrado",
                }
            }
            )


            res.status(200).json(sendSearch)
        } catch (err) {
            res.status(404).send("No se encontro")
        }
    } else {
        // -------------------------------------------------------
        try {
            const countriesState = await Country.findAll()
            if (countriesState.length === 0) {
                await allCountries();
                // await loadActivities();
                let dbInfo = await Country.findAll({
                    include: {
                        model: Activity
                    }
                })
                res.status(200).json(dbInfo)
            } else {
                let dbInfo = await Country.findAll({
                    include: {
                        model: Activity
                    }
                })
                res.status(200).json(dbInfo)
            }
        } catch (err) {
            console.log(err, "error en la ruta get")
        }
    }
})
// ----------------------------------------------------------------------------------------------



server.get('/:id', (req, res) => {
    try {
        let idPais = req.params.id
        if (idPais.length === 3) {
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
        } else { res.status(404).send("ID equivocado") }
        // -----------------------------
        // res.status(200).json(idBd)
    } catch (err) {
        console.log(err, "error en busqueda por id")
    }
})




module.exports = server;



const express = require('express');
require('dotenv').config();
const axios = require('axios');
const server = require("express").Router();
const { Country, Activity, actArray } = require('../db');
const { validarActivity } = require("./function");



server.post('/', async (req, res) => {

    let { name, difficulty, duration, season, country } = req.body
    try {
        await validarActivity(name, country);
    } catch (err) {
        return res.status(404).json({
            error: err,
            name: name,
            country: country
        })
    }

    //  --------------------------

    try {

        const createActivity = await Activity.create({
            name: name,
            difficulty: difficulty,
            duration: duration,
            season: season,
        })

        let countryBd = await Country.findAll({
            where: {
                name: country
            }
        })

        await createActivity.addCountry(countryBd)
        res.status(200).send("Creado con exitooooo");
    } catch (err) {
        res.status(404).send("error en la creacion de actividad")
    }
})




// -----------------------------------------------------------------------
server.get('/', async (req, res) => {
    const saveActivity = await Activity.findAll({
        include: { model: Country }
    })

    res.status(200).json(saveActivity)
})




module.exports = server;

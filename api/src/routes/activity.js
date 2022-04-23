const express = require('express');
require('dotenv').config();
const axios = require('axios');
const server = require("express").Router();
const { Country, Activity, actArray } = require('../db');
const { validarActivity } = require("./function");



server.post('/', async (req, res) => {

    let { name, difficulty, duration, season, country } = req.body
    // console.log(name, difficulty, duration, season, country)
    let nameMin = name.trim().toLocaleLowerCase()
    let difficultyChange = difficulty[1].trim()
    let seasonChange = season.map(e => e.name.trim().slice(0, 6).trim())


    try {
        await validarActivity(nameMin, country);
    } catch (err) {
        return res.status(200).send("ERROR")
    }

    //  --------------------------

    try {

        const createActivity = await Activity.create({
            name: nameMin,
            difficulty: difficultyChange,
            duration: duration,
            season: seasonChange,
        })


        let countryBd = await Country.findAll({
            where: {
                name: country
            }
        })

        await createActivity.addCountry(countryBd)
        res.status(200).send("Creado");
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

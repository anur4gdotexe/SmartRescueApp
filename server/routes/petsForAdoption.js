const express = require('express');
const {getPetsForAdoptionCollection} = require('../config/db');

const router = express.Router();

router.get("", async (req, res) => {
    try {
        const petsForAdoptionCollection = getPetsForAdoptionCollection();
        const pets = await petsForAdoptionCollection.find({}).toArray();
        
        res.json(pets);
        res.status(200);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: "Server error"});
    }
});

module.exports = router;
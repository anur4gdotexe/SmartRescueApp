const express = require("express");
const {getSheltersCollection} = require("../config/db");

const router = express.Router();

//GET /shelters/near?lat=28.4535&lon=77.3452
router.get("/near", async (req, res) => {
    try {
        const {lat, lon} = req.query;
        const sheltersCollection = getSheltersCollection();

        const shelters = await sheltersCollection.aggregate([
            {
                $geoNear: {
                    near: {type: "Point", coordinates: [parseFloat(lon), parseFloat(lat)]},
                    distanceField: "distance",
                    maxDistance: 10000,
                    spherical: true
                }
            },
            {$limit: 10}
        ]).toArray();

        res.json(shelters);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: "Server error"});
    }
});

module.exports = router;
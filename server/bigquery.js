// api/data
var express = require('express');
var router = express.Router();
var bq = require("./tools/bigquery")

router.get("/", async (req, res) => {
    const query_parameter = `SELECT * FROM \`dev-era-184513.WIP.viewability\``

    bq.query(query_parameter).then(
        (data) => res.send(data)
    )
})

module.exports = router;

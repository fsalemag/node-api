var express = require('express');
var router = express.Router();
var gsheets = require("./tools/gsheets")

// Redirect all api/data endpoints to BQ
const bq = require("./bigquery.js");
router.use("/data", bq)

router.get('/', function(req, res) {
  res.send(`
  <h1 style='color:blue'>Welcome to the API endpoint</h1>
  <p> Unfortunately from here, you can only proceed with the proper credentials</p>  
  `)
});

const USERS_SHEET_ID = "1r8_SHga9LVhUCbfmfpmKTDRToBjLb0fXwyGX4OBNBQA"
const USERS_SHEET_RANGE = "Users!A1:B"

// Get all users
router.get('/users', function(req, res) {
  gsheets.get_sheet_data(USERS_SHEET_ID, USERS_SHEET_RANGE, (data) => {
    res.send(data);
  })
});

// Just a simple email verification
router.get('/users/:email([^\|]+@*.*)', (req, res) => {
  gsheets.get_sheet_data(USERS_SHEET_ID, USERS_SHEET_RANGE, (data) => {
    res.send(data.find(data => data.User === req.params.email));
  })
});

module.exports = router;
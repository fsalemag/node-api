const {google} = require('googleapis');
const path = require("path");

const SERVICE_ACCOUNT_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(path.dirname(__dirname), "credentials", "service_account.json");
const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_PATH,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
});

const get_sheet_client = function(callback) {
  const sheets_client = google.sheets({version: 'v4', auth: auth});
  callback(sheets_client)
}

const convert_rows_to_object = function (rows){
  let header = rows.shift()
  sheet_data = rows.reduce((acc, current) =>{
    let obj = {}
    header.forEach((val, i) =>{
        obj[val] = current[i];
    })
    
    acc.push(obj)
    return acc
  }, [])
  return sheet_data
}

module.exports = {
  get_sheet_data: function(sheet_id, range, callback){
    return get_sheet_client((client) => {
      client.spreadsheets.values.get({
        spreadsheetId: sheet_id,
        range: range,
      }, (err, data) => {
        if (err) return console.log('The API returned an error: ' + err);   
        let sheet_data = convert_rows_to_object(data.data.values);
        console.log(sheet_data)
        callback(sheet_data)
        }
      )
    });    
  }
}

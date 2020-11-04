const {BigQuery} = require('@google-cloud/bigquery');


async function query(query_parameter) {
    const projectId = process.env.PROJECT_ID;
    const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const bigquery = new BigQuery({projectId, keyFilename});


    // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
    const options = {
      query: query_parameter,
      location: 'EU',
    };

    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();
    return rows
}

module.exports = {
    query:query,
}

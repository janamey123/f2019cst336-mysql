const express = require('express');
const app = express.Router();
const mysql = require('mysql');

app.get('/quotes', function (req, res, next) {

    // Get a query string value for filter
    const nameFilter = req.query.name;

    const connection = mysql.createConnection({
        host: 'gmgcjwawatv599gq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com\t',
        user: 'vr51fr35ztycmd35',
        password: 'pfoyhzg1z1yusckl',
        database: 's0potvjirbd4ea7f'
    });

    connection.connect();

    connection.query(`
SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender'
FROM l9_quotes q INNER JOIN
l9_author a ON q.authorId = a.authorId
WHERE a.firstName LIKE '${nameFilter}'
`,
        function (error, results, fields) {
            if (error) throw error;
            console.log('The quotes are: ', results);

            res.render('../public/labs/9/view', {
                title: 'Lab 9',
                quotes: results
            });
        });

    connection.end();

});

module.exports = app;

// running server
app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("Express server is running...");
});
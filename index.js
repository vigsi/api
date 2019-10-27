var express = require('express');
var url_queries = require('./queries/get-signed-urls')
var app = express();

app.get('/api/arima/:start-:end', function (req, res) {
    res.send(url_queries.getArimaUrls(req.params));
 
});
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
})
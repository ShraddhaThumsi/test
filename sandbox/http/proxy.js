/**
 * Created by shraddha on 12/8/16.
 */
module.exports = function (app)
{
    var http = require('http');
    app.get("/api/recipe/queryName/:queryName", findRecipesByQuery);

    function findRecipesByQuery(req, res)
    {
        var options = {
            host: 'www.edamam.com',
            path: '/&r=' + req.params.queryName
        };

        callback = function(response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                res.writeHead(200, {"Content-Type": "application/json"})
                res.end(str);
            });
        }

        http.request(options, callback).end();
    }
};
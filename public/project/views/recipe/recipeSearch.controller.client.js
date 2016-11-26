/**
 * Created by shraddha on 11/20/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("RecipeSearchController", RecipeSearchController);

    function RecipeSearchController($routeParams) {
        var vm = this;
        var userId =  $routeParams.uid;
        vm.userId = userId;
        vm.loadDoc = loadDoc;
        function loadDoc(queryName) {
            vm.queryName = queryName;
            var recipe = null;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {

                    recipe = this.responseText;
                    /*console.log(recipe);*/
                    var jsonObject = JSON.parse(recipe);
                    console.log(jsonObject);
                    console.log("above is the json object");
                    /*alert(jsonObject.hits[0].recipe);
                     console.log(jsonObject);*/
                    var tempoArray = jsonObject.hits;
                    document.getElementById("enterJSON").innerHTML = "";
                    for (var hit in tempoArray) {
                        //console.log(tempoArray[hit]);
                        //console.log("above is the hits for the given query");
                        document.getElementById("enterJSON").innerHTML += " <a href ='" + tempoArray[hit].recipe.url + "' ><img src = '" + tempoArray[hit].recipe.image + "'></img></a>";
                    }

                }
            };
            var url = encodeURI("http://api.edamam.com/search?app_id=be979c85&app_key=a6ded68b7dd66370c211045072bcb1a8&q=" + queryName);


            xhttp.open("GET", url, true);

            xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
            xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhttp.withCredentials = false;

            xhttp.send();

        }

//------BACKEND CODE FOR FILE UPLOAD-------
        /*var exports = module.exports = {};
        module.exports = function (app) {
            var multer = require('multer'); // npm install multer --save
            var upload = multer({dest: __dirname + '/../project/uploads'});
            app.post("/api/example/upload", upload.single('myFile'), uploadImage);
            function uploadImage(req, res) {
                var widgetId = req.body.widgetId;
                var width = req.body.width;
                var myFile = req.file;
                var originalname = myFile.originalname; // file name on user's computer
                var filename = myFile.filename;     // new file name in upload folder
                var path = myFile.path;         // full path of uploaded file
                var destination = myFile.destination;  // folder where file is saved to
                var size = myFile.size;
                var mimetype = myFile.mimetype;
                res.send(myFile);
            }
        }*/
    }
})();
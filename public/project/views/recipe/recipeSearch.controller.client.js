/**
 * Created by shraddha on 11/20/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("RecipeSearchController", RecipeSearchController);

    function RecipeSearchController($routeParams, $location, $http) {
        var vm = this;
        var userId =  $routeParams.uid;
        vm.userId = userId;
        vm.loadDoc = loadDoc;
        function loadDoc(queryName) {
            console.log("You have asked for recipes on: " +  queryName);
            vm.queryName = queryName;
            var recipe = null;


            $http.get("https://api.edamam.com/search?app_id=be979c85&app_key=a6ded68b7dd66370c211045072bcb1a8&q=" + queryName)
                .success(function (result) {
                    console.log(result);
                    vm.hitArray = result.hits;
                });

            // var xhttp = new XMLHttpRequest();
            // xhttp.onreadystatechange = function () {
            //
            //     if (this.readyState == 4 && this.status == 200) {
            //
            //         recipe = this.responseText;
            //         var jsonObject = JSON.parse(recipe);
            //         vm.hitArray = jsonObject.hits;
            //
            //         console.log(vm.hitArray);
            //
            //
            //
            //
            //
            //
            //
            //
            //        // document.getElementById("enterJSON").innerHTML = "";
            //         /*for (var hit in tempoArray) {
            //             var apiCallString = "http://api.edamam.com/search?app_id=be979c85&app_key=a6ded68b7dd66370c211045072bcb1a8&r=";
            //             var imageUri = tempoArray[hit].recipe.uri;
            //             var imageUriNew = imageUri.replace("#", "%23");
            //             document.getElementById("enterJSON").innerHTML +=
            //             " <a href ='" +
            //                 apiCallString
            //                 + imageUriNew + "' ><img src = '" + tempoArray[hit].recipe.image + "'>" +
            //                 "</img></a>";
            //
            //         }*/
            //
            //     }
            // };
            // var url = encodeURI("https://api.edamam.com/search?app_id=be979c85&app_key=a6ded68b7dd66370c211045072bcb1a8&q=" + queryName);
            //
            //
            // xhttp.open("GET", url, true);
            // xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
            // xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
            // xhttp.withCredentials = false;
            //
            // xhttp.send();

        }
    }
})();
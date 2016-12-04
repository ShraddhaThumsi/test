/**
 * Created by shraddha on 11/28/16.
 */


(function(){
    angular
        .module("RecipeMaker")
        .factory("RecipeService", RecipeService);

    function RecipeService($http)
    {
        var api = {
            getRecipesByQueryName: getRecipesByQueryName

        };
        return api;

        function getRecipesByQueryName(queryName)
        {


            var recipe = null;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {

                    recipe = this.responseText;
                    var jsonObject = JSON.parse(recipe);
                    var tempoArray = jsonObject.hits;
                    console.log(typeof tempoArray);
                    return tempoArray;
                }
            };
            var url = encodeURI("https://api.edamam.com/search?app_id=be979c85&app_key=a6ded68b7dd66370c211045072bcb1a8&q=" + queryName);


            xhttp.open("GET", url, true);
            xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
            xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhttp.withCredentials = false;

            xhttp.send();



        }
    }

})();

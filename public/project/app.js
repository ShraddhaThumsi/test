/**
 * Created by shraddha on 11/9/16.
 */
function loadDoc(queryName) {
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
            for (var hit in tempoArray) {
                console.log(tempoArray[hit]);
                console.log("above is the hits for the given query");
                document.getElementById("enterJSON").innerHTML = " ";
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



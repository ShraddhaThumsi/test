/**
 * Created by shraddha on 11/5/16.
 */

function loadDoc(queryName) {
    var recipe = null;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {



        if (this.readyState == 4 && this.status == 200) {

            recipe = this.responseText;
            var jsonObject = JSON.parse(recipe);
            /*alert(jsonObject.hits[0].recipe.image);
            console.log(jsonObject);*/
            document.getElementById("enterJSON").innerHTML = " <a href ='"+ jsonObject.hits[0].recipe.url +"' ><img src = '"+ jsonObject.hits[0].recipe.image +"'></img></a>";
        }
    };
    var url =  encodeURI("http://api.edamam.com/search?app_id=be979c85&app_key=a6ded68b7dd66370c211045072bcb1a8&q="+queryName);


    xhttp.open("GET", url, true);

    xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.withCredentials = false;

    xhttp.send();


}
/**
 * Created by shraddha on 11/5/16.
 */

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {



        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("enterJSON").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "http://api.edamam.com/search?app_id=be979c85&app_key=a6ded68b7dd66370c211045072bcb1a8&q=cupcake", true);
    xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.withCredentials = false;

    xhttp.send();
}
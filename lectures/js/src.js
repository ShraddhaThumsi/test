/**
 * Created by shraddha on 10/10/16.
 */
(function() {
    var a = 2;
    var b = 4;
    var c = Math.pow(a, b);

    var fact = 1;
    for (var i = 1; i <= 7; i++) {
        fact = fact * i;
    }


    var array = [10, 20, 3, 70, 78, 98, 76];
    var arrayMin = array[0];
    var arrayMax = array[0];
    for (var j = 0; j < array.length; j++) {
        if (array[j] < arrayMin)
            arrayMin = array[j];
        if (array[j] > arrayMax)
            arrayMax = array[j];

    }


    function minFunc(array) {
        var arrayMin = array[0];
        for (var j = 0; j < array.length; j++) {
            console.log(array[j]);
            if (array[j] < arrayMin)
                arrayMin = array[j];

        }
        return arrayMin;
    }

    alert("Min: " + minFunc(array));
})();
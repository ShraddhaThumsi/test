/**
 * Created by shraddha on 11/23/16.
 */

(function (){
    $(init);
    function init()
    {
        var readHidden = true;
        var travelHidden = true;
        var danceHidden = true;
        $("#readHeader").click(readClick);

        $("#danceHeader").click(danceClick);

        function readClick(){
            if(readHidden)
            {
                $("#readMaterial").show();
                readHidden = false;
            }

            else
            {
                $("#readMaterial").hide();
                readHidden = true;

            }
        }



        function danceClick()
        {
            if(danceHidden)
            {
                $("#danceMaterial").show();
                danceHidden = false;
            }

            else
            {
                $("#danceMaterial").hide();
                danceHidden = true;

            }
        }


    }

})();
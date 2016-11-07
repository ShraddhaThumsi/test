/**
 * Created by shraddha on 11/6/16.
 */
(function(){
    angular
        .module("ToDoApp")
        .factory("ToDoService", ToDoService);
    function ToDoService($http)
    {

        var api = {
            getAllTodos: getAllTodos,
            sort: sort
        };
        return api;

        function getAllTodos(){
            var url ="/api/experiments/todo";
            return $http.get(url);
        }

        function sort(start, stop){
            var url ="/api/experiments/todo?start=START&stop=STOP";
            url = url.replace("START", start)
                     .replace("STOP", stop);
            console.log(start + "start");
            console.log(stop + "stop");
            $http.put(url);
        }

    }
})();
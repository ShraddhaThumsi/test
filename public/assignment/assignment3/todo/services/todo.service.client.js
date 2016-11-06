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

        function sort(){

        }

    }
})();
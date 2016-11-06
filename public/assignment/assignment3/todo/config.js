/**
 * Created by shraddha on 11/6/16.
 */
(function(){
    angular
        .module("ToDoApp")
        .config(Config);

    function Config($routeProvider)
    {
        $routeProvider
            .when("/todo" , {
                templateUrl: "views/todo/todo-list.view.client.html",
                controller: "ToDoListController",
                controllerAs: "model"

            })
    }
})();
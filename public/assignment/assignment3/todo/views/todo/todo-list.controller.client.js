/**
 * Created by shraddha on 11/6/16.
 */
(function(){
    angular
        .module("ToDoApp")
        .controller("ToDoListController", ToDoListController);
    function ToDoListController(ToDoService)
    {
        var vm = this;


        var promise = ToDoService.getAllTodos();
        promise
            .success(function (todos){
                vm.todos = todos;
                /*$("tbody").sortable();*/
            })
            .error(function (error){
                console.log(error);
            })
    }
})();
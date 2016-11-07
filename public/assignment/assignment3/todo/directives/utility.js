/**
 * Created by shraddha on 11/6/16.
 */
(function(){
    angular
        .module("utility", [])
        .directive("sortable", sortable);

    function sortable()
    {
        function linker(scope, element, attributes)
        {
            var startIndex = -1;
            var stopIndex = -1;
            element.sortable({
                start: function (event, ui){
                    startIndex = $(ui.item).index();
                },
                stop: function(event, ui){
                    stopIndex = $(ui.item).index();
                    scope.sortableController.sort(startIndex, stopIndex);
                }
            });
        }
        var directive = {
            scope:{},
            link: linker,
            controller: sortableController,
            controllerAs: 'sortableController'
        };
        return directive;
    }

    function sortableController(ToDoService){
        var vm = this;
        vm.sort = sort;

        function sort(start, stop){
            ToDoService.sort(start, stop);
        }
    }
})();
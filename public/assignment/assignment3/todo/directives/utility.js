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
        return{
            scope:{},
            link: linker,
            controller: sortableController,
            controllerAs: 'sortableController'
        }
    }

    function sortableController(){
        var vm = this;
        vm.sort = sort;

        function sort(start, stop){
            console.log([start, stop]);
        }
    }
})();
/**
 * Created by shraddha on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService){
        var vm = this;
        vm.widgets = WidgetService.findWidgetsByPageId();
    }
})();
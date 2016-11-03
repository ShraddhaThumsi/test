/**
 * Created by shraddha on 10/18/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService,
                                  $location, $sce){
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.userId = userId;
        var websiteId = parseInt($routeParams['wid']);
        vm.websiteId = websiteId;
        var pageId = parseInt($routeParams['pid']);
        vm.pageId = pageId;

        var widgetId = parseInt($routeParams['wgid']);
        vm.widgetId = widgetId;
        /*console.log(vm.widgets);*/
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
        vm.goToChooseWidget = goToChooseWidget;
        vm.checkSafeImageSrc = checkSafeImageSrc;
        function checkSafeImageSrc(url)
        {
            return $sce.trustAsResourceUrl(url);

        }

        function checkSafeHtml(html)
        {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url)
        {
            var parts = url.split('/');
            var id = parts[parts.length - 1];

            url = "https://www.youtube.com/embed/"+id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);

        }

        function goToChooseWidget() {
            $location.url("user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/new");
        }


        function init(){
            var widgets = WidgetService.findWidgetsByPageId(pageId);
            vm.widgets = widgets;
            /*var promise = WidgetService.findWidgetsByPageId(pageId);
            promise
                .success(function widgets(widgets){
                    vm.widgets = widgets;
                })
                .error(function(aaa){
                    console.log(aaa);
                });*/

            /*var allWidgets = $(".wam-widgets");
            alert(allWidgets.length);*/
        }
        init();

    }
})();
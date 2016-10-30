/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http){
        var idGenerator = 1200;
        console.log(idGenerator);
        /*var pages = [
            { _id: "321", name: "Post 1", wid: 456},
            { _id: "432", name: "Post 2", wid: 456},
            { _id: "543", name: "Post 3", wid: 456}
        ];*/

        var api =
        {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId, page)
        {
            var url = "/api/user/:uid/website/"+websiteId+"/page"
            return $http.post(url, page);
            /*var pageExists = false;
            for(var p in pages)
            {
                var existingPage = pages[p];
                if(existingPage.name === page.name)
                {
                    pageExists = true;
                    return null;
                }
            }

            var newPage =
            {
                _id: (idGenerator + 1).toString(),
                name: page.name,
                wid: websiteId
            };

            pages.push(newPage);
            console.log("page id:" + newPage._id);
            console.log("updated list of pages: " + pages);
            return newPage;*/

        }

        function findPageByWebsiteId(websiteId)
        {
            var url = "/api/user/:uid/website/"+websiteId+"/page";
            return $http.get(url);
            /*var result = [];
            for(var p in pages)
            {
                var tempo = pages[p];
                console.log("reporting from page service, this is the datatype of page name: " +
                    typeof tempo.name);
                if(parseInt(tempo.wid) === parseInt(websiteId))
                {
                    result.push(tempo);
                }
            }
            console.log(result);
            return result;*/

        }

        function findPageById(uid, websiteId, pageId)
        {
            var url = "/api/user/"+uid+"/website/"+websiteId+"/page/"+pageId;
            return $http.get(url);

        }

        function updatePage(pageId, page)
        {

            var url = "/api/user/:uid/website/:wid/page/"+pageId;
            return $http.put(url, page);
            /*console.log(pageId);
            console.log(page);
            var currentPage;
            for(var p in pages)
            {
                currentPage = pages[p];
                if(currentPage._id.toString() === pageId.toString())
                {
                    console.log(typeof currentPage);
                    currentPage.name = page.name;

                    return currentPage;
                }
            }
            return currentPage;*/
        }

        function deletePage(pageId)
        {
            var url = "/api/user/:uid/website/:wid/page/"+pageId;
            return $http.delete(url, pageId);

            /*var i;
            var found = false;
            for(i in pages)
            {
                console.log(typeof pages[i]._id);
                console.log(typeof pageId);
                if(pages[i]._id.toString() === pageId.toString())
                {
                    console.log(pages);
                    found = true;
                    break;

                }
            }

            if(found)
            {
                console.log(i);
                pages.splice(i,1);
                return true;
            }
            return false;*/
        }
    }
})();
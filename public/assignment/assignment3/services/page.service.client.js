/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService(){
        var idGenerator = 1200;
        console.log(idGenerator);
        var pages = [
            { _id: "321", name: "Post 1", wid: 456},
            { _id: "432", name: "Post 2", wid: 456},
            { _id: "543", name: "Post 3", wid: 456}
        ];

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
            var pageExists = false;
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
            return newPage;

        }

        function findPageByWebsiteId(websiteId)
        {
            var result = [];
            for(var p in pages)
            {
                if(parseInt(pages[p].wid) === websiteId)
                {
                    result.push(pages[p]);
                }
            }
            console.log(result);
            return result;
        }

        function findPageById(pageId)
        {
            var result = [];
            for(var p in pages)
            {
                if(parseInt(pages[p]._id) === pageId)
                {
                    result.push(pages[p]);
                }
            }
            console.log(result);
            return result;
        }

        function updatePage(pageId, page)
        {
            console.log(pageId);
            console.log(page);
            var currentPage;
            for(var p in pages)
            {
                currentPage = pages[p];
                if(currentPage._id.toString() === pageId.toString())
                {
                    currentPage.name = page.name;
                    console.log(pages);
                    return currentPage;
                }
            }
            return currentPage;
        }

        function deletePage(pageId)
        {
            var i;
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
            return false;
        }
    }
})();
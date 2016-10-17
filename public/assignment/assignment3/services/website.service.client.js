/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService() {
        var websites = [
            { _id: "123", name: "Facebook",    uid: "456" },
            { _id: "234", name: "Twitter",     uid: "456" },
            { _id: "456", name: "Gizmodo",     uid: "456" },
            { _id: "567", name: "Tic Tac Toe", uid: "123" },
            { _id: "678", name: "Checkers",    uid: "123" },
            { _id: "789", name: "Chess",       uid: "234" }
        ];

       /* [
            { _id: "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];*/
       // check if this is the correct data format




        /*[
         {name: 'facebook.com', uid: 123},
         {name: 'twitter.com', uid: 234},
         {name: 'wikipedia.org', uid: 123}
         ];*/
        var api ={
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite

        };
        return api;
        function findWebsitesByUser(uid){
            var result = [];
            for(var w in websites)
            {
                if(parseInt(websites[w].uid) === uid)
                {
                    result.push(websites[w]);
                }
            }
            console.log(result);
            return result;
        }

        function findWebsiteById(websiteId){
            var result = [];
            for(var w in websites)
            {
                if(parseInt(websites[w]._id) === websiteId)
                {
                    result.push(websites[w]);
                }
            }
            console.log(result);
            return result;
        }

        function createWebsite(userId, website)
        {

        }

        function updateWebsite(websiteId, website)
        {

        }

        function deleteWebsite(websiteId)
        {

        }


    }
})();

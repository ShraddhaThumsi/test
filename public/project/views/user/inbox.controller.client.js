/**
 * Created by shraddha on 12/6/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("ViewInboxController", ViewInboxController);

    function ViewInboxController($routeParams, $location, UserService, $rootScope)
    {
        var vm = this;
        vm.message = "hello, I would like to connect with you";
        vm.reply = "hi, thanks for the message";
        if($rootScope.currentUser){
            var userId =  $rootScope.currentUser._id;
            vm.userId = userId;
        }

        vm.sendEmail = sendEmail;
        vm.replyMail = replyMail;

        var popularUserId = "584b0aded53ea97a55599ef5";

        function init(){

            var promise = UserService.findUserById(popularUserId);
            promise
                .success(function(popularUser){
                    console.log(popularUser);
                    vm.popularUser = popularUser;
                })
                .error(function(error){
                    console.log(error);
                })
            var promise2 = UserService.viewInbox(userId);
            promise2
                .success(function(user){
                    vm.user = user;

                })
                .error(function(error){
                    console.log(error);
                })
        }
        init();


        function sendEmail(message)
        {
            vm.message = message;
            console.log(message);
            var promise = UserService.sendEmail(userId, popularUserId, message);
            promise
                .success(function(user){
                    vm.user = user;
                    vm.successMessage = "your message has been sent";
                })
                .error(function(error){
                    console.log(error);
                })
        }

        function replyMail(reply)
        {
            vm.reply = reply;
            console.log(reply);
            var promise = UserService.sendEmail(popularUserId, userId, reply);
            promise
                .success(function(user){
                    vm.user = user;
                    vm.successMessage = "your message has been sent";
                })
                .error(function(error){
                    console.log(error);
                })
        }
    }

})();
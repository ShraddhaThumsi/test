/**
 * Created by shraddha on 12/8/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("AdminRightsController", AdminRightsController);

    function AdminRightsController(UserService, $routeParams, $location, $rootScope)
    {
        var vm = this;
        if($rootScope.currentUser){
        var userId =  $rootScope.currentUser._id;
        vm.userId = userId;
        }
        vm.promoteMember = promoteMember;
        vm.deleteMember = deleteMember;
        vm.newUserByAdmin = newUserByAdmin;

        var message = "welcome to admin rights page";
        vm.message = message;
        function init()
        {
            var promise = UserService.getAllUsers($rootScope.currentUser);
            promise
                .success(function(users){
                    vm.users = users;
                })
        }
        init();

        function promoteMember(memberId, memberBody)
        {
            vm.memberId = memberId;
            vm.member = memberBody;
            var promise = UserService.promoteMemberByAdmin(memberId, memberBody);
            promise
                .success(function(updatedMember){
                    $location.url("/user/admin");
                    console.log(updatedMember)
                })
                .error(function(error){
                    console.log(error);
                })

        }

        function deleteMember(memberId)
        {
            vm.memberId = memberId;
            console.log(memberId);
            var promise = UserService.deleteMemberByAdmin(memberId);
            promise
                .success(function(deletedMember)
                {
                    $location.url("/user/admin");
                    console.log(deletedMember);

                })
                .error(function(error){
                    console.log(error);
                })
        }

        function newUserByAdmin(newUserEmail, newUserPassword, newUserFirstName, newUserLastName, newUserRole)
        {
            vm.newUserEmail = newUserEmail;
            vm.newUserPassword = newUserPassword;
            vm.newUserFirstName = newUserFirstName;
            vm.newUserLastName = newUserLastName;
            vm.newUserRole = newUserRole;
            var newUserByAdmin = {
                email: newUserEmail,
                password: newUserPassword,
                firstName: newUserFirstName,
                lastName: newUserLastName,
                role: newUserRole
            }



            var promise = UserService.createNewUserByAdmin(newUserByAdmin);
            promise
                .success(function(newUser){
                    $location.url("/user/admin");

                })
                .error(function(error){
                    console.log(error);
                })

        }
    }
})();
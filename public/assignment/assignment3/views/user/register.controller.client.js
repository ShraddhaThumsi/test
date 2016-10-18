/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService)
    {
        var vm = this;
        var potentialUser = {
            username: vm.username,
            password1: vm.password1,
            password2: vm.password2,
            firstName: vm.firstName,
            lastName: vm.lastName,
            email: vm.email
        };

        if(potentialUser.password1 === potentialUser.password2)
        {
            var newUser = {
                username: vm.username,
                password: vm.password1,
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email
            };

            var success = UserService.createUser(newUser);
            if(success)
            {
                vm.error = "User Already Exists, please try to login";
            }

            else UserService.createUser(newUser);
        }

        else vm.error = "Passwords Do not match, please try again";



    }
})();
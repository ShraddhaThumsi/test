/**
 * Created by shraddha on 11/18/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $rootScope)
    {
        var vm = this;

        vm.SignUp = SignUp;
        function SignUp(email, password1, password2, firstName, lastName)
        {
            if(password1 === password2)
            {
                var newUser = {
                    email: email,
                    password: password1,
                    firstName: firstName,
                    lastName: lastName

                };


              //  var promise = UserService.createUser(newUser);
                var promise = UserService.register(newUser);

                promise
                    .success(function(userExists){
                        if (userExists == true) {
                            alert("User exists");
                        }

                        else {var userId = userExists._id;
                            vm.userId = userId;
                            vm.SignUp = userExists;
                            $rootScope.currentUser = userExists;
                            $location.url("/user");
                        }
                    })
                    .error(function(aaa){
                        console.log(aaa);
                    });
            }

            else vm.error = "passwords do not match, please try again."
        }
    }
})();
(function () {
    angular
        .module("QuestionListMaker")
        .controller("AdminController", AdminController)
        .controller("AddUserController", AddUserController)
        .controller("EditUserController", EditUserController)
    ;
    
    function AdminController(UserService, $timeout, $window, admin,$location) {
        var vm = this;
        vm.deleteUser = deleteUser;
        vm.admin = admin;
        console.log(admin);
        vm.updateUser = updateUser;
        vm.logout = logout;
        UserService
            .findAllUsers()
            .then(function (users) {
                vm.users = users;
            });

        function deleteUser(user,index) {
            if (user._id === admin._id) {
                vm.error = "You cannot delete yourself!";
                $timeout(function () {
                    vm.updated = null;
                }, 3000);
            } else {
                UserService
                    .deleteUser(user._id)
                    .then(function () {
                        vm.users.splice(index, 1);;
                    }, function () {
                        vm.error = "Unable to remove this user.";
                        $timeout(function () {
                            vm.error = null;
                        }, 3000);
                    });
            }
        }
        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function () {
                    vm.updated = "Profile changes saved!";
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });
        }
        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }
    }
    function AddUserController(UserService, $timeout, $window, admin,$location) {
        var vm = this;
        vm.admin = admin;
        console.log(admin);
        vm.register = register;
        function register(user) {
            if (user.username === undefined || user.username === null || user.username === ""
                || user.password === undefined || user.password === "") {
                vm.error = "Username and Passwords cannot be empty.";
                return;
            }
            UserService
                .findUserByUsername(user.username)
                .then(
                    function (usero) {
                        if (usero !== null) {
                            vm.error = "Username already exists.";
                            $timeout(function () {
                                vm.error = null;
                            }, 3000);
                            return;
                        } else {
                            // return the promise
                            user.roles=['USER'];
                            return UserService
                                .createnewuser(user);
                        }
                    })
                .then(
                    function () {
                        
                        $location.url("/admin");
                    });
        }
    }
    function EditUserController($routeParams,UserService, $timeout, $window, admin,$location) {
        var vm = this;
        vm.admin = admin;
        console.log(admin);
        var uid = $routeParams.uid;
        vm.updateUser = updateUser;
        UserService
            .findUserById(uid)
            .then(
                function (user) {
                    vm.user = user;
                    
                });
        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function () {
                    vm.updated = "Profile changes saved!";
                    $location.url("/admin");
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });
        }
        /*
        vm.register = register;
        function register(username, password, vpassword) {
            if (username === undefined || username === null || username === ""
                || password === undefined || password === "") {
                vm.error = "Username and Passwords cannot be empty.";
                return;
            }
            if (password !== vpassword) {
                vm.error = "Password does not match.";
                return;
            }
            UserService
                .findUserByUsername(username)
                .then(
                    function (user) {
                        if (user !== null) {
                            vm.error = "Username already exists.";
                            $timeout(function () {
                                vm.error = null;
                            }, 3000);
                            return;
                        } else {
                            var user = {
                                username: username,
                                password: password,
                                firstName: "",
                                lastName: "",
                                email: "",
                                roles:['USER']
                            };
                            // return the promise
                            return UserService
                                .createnewuser(user);
                        }
                    })
                .then(
                    function () {
                        
                        $location.url("/admin");
                    });
        }*/
    }
})();
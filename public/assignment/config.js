(function(){
    angular
        .module("QuestionListMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider

            .when('/register', {
                templateUrl : "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when('/login', {
                templateUrl : "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when('/profile', {
                templateUrl : "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/dashboard', {
                templateUrl : "views/user/templates/dashboard.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/admin', {
                templateUrl : "views/admin/templates/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    admin: checkAdmin
                }
            })
            .when('/management', {
                templateUrl : "views/admin/templates/admin.view.management.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    admin: checkAdmin
                }
            })
			.when('/adduser', {
					templateUrl : "views/admin/templates/admin.view.adduser.html",
					controller: "AddUserController",
					controllerAs: "model",
					resolve: {
						admin: checkAdmin
					}
			})
            .when('/edituser/:uid', {
					templateUrl : "views/admin/templates/admin.view.edituser.html",
					controller: "EditUserController",
					controllerAs: "model",
					resolve: {
						admin: checkAdmin
					}
			})
            .when("/home", {
                templateUrl : "./views/home/templates/home.html",
                controller: "HomepageController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
		    .when("/questionList", {
                templateUrl : "./views/user/templates/questionList.html",
                controller: "QuestionListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/questionEdit", {
                templateUrl : "./views/user/templates/questionEdit.html",
                controller: "QuestionEditController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/questionEditAlready/:qid", {
                templateUrl : "./views/user/templates/questionEditAlready.html",
                controller: "QuestionEditAlreadyController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/paperList", {
                templateUrl : "./views/user/templates/paperList.html",
                controller: "PaperListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/paperEdit", {
                templateUrl : "./views/user/templates/paperEdit.html",
                controller: "PaperEditController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/paperEditAlready/:pid", {
                templateUrl : "./views/user/templates/paperEditAlready.html",
                controller: "PaperEditAlreadyController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/paperPreview/:pid", {
                templateUrl : "./views/user/templates/paperPreview.html",
                controller: "PaperPreviewController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .otherwise({
                redirectTo : "/home"
            });
    }

    // security
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http
            .get('/api/loggedin')
            .then(function(response) {
                var user = response.data;
                if (user !== '0') {
                    deferred.resolve(user);
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
            });
        return deferred.promise;
    };

    var checkCurrentUser = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http
            .get('/api/loggedin')
            .then(function(response) {
                var user = response.data;
                if (user === '0') {
                    user = null;
                }
                deferred.resolve(user);

            });
        return deferred.promise;
    };

    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http
            .get('/api/loggedin')
            .then(function(response) {
                // console.log(user.data);
                var user = response.data;
                if (user !== '0') {
                    if (user.roles.indexOf('ADMIN') > -1) {
                        deferred.resolve(user);
                    }
                } else {
                    $location.url('/home');
                }

            });
        return deferred.promise;
    };

})();
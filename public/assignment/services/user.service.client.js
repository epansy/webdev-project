(function () {
    angular
        .module("QuestionListMaker")
        .factory('UserService', UserService);

    function UserService($http) {
        var services = {
            // "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "findAllUsers": findAllUsers,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "setCurrentUser":setCurrentUser,
            "createnewuser":createnewuser,
            "login":login,
            "logout" : logout,
            "register" : register,
			"createQuestion": createQuestion,
			"getQuestionList":getQuestionList,
            "getQuestionById":getQuestionById,
            "deleteQuestion":deleteQuestion,
            "updateQuestion":updateQuestion,
            "createPaper":createPaper,
            "getPaperList":getPaperList,
            "getPaperById":getPaperById,
            "updatePaper":updatePaper,
			"deletePaper":deletePaper
            // "checkLoggedIn" : checkLoggedIn
        };
        return services;

        // security

        function login(username, password) {
            var url = "/api/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function logout() {
            var url = "api/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function register(user) {
            var url = "api/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }
        function createnewuser(user){
            var url = "api/createnewuser";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }
        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }
        //

        // function createUser(user) {
        //     var url = "/api/user";
        //     return $http.post(url, user)
        //         .then(function (response) {
        //             return response.data;
        //         });
        //
        // }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    var user = response.data;
                    return user;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            var url = '/api/alluser';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
            // return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
		function createQuestion(question,uid){
			var url = "/api/submitQuestion/" + uid;
			return $http.post(url, question)
                .then(function (response) {
                    return response.data;
                })
		}
        function updateQuestion(qid,question){
			var url = "/api/updateQuestion/" + qid;
			return $http.post(url,question)
                .then(function (response) {
                    return response.data;
                })
		}
		function getQuestionList(uid){
			var url = "/api/getQuestionList/" + uid;
			return $http.get(url)
                .then(function (response) {
                console.log(response.data);
                    return response.data;
                })
		}
        function getQuestionById(qid){
            var url = "/api/getQuestionById/" + qid;
            return $http.get(url)
                .then(function (response) {
                console.log(response.data);
                    return response.data;
                })
        }
		function deleteQuestion(qid){
            var url = "/api/deleteQuestion/" + qid;
            return $http.get(url)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                })
        }
        function createPaper(paper,uid){
            var url = "/api/submitPaper/" + uid;
			return $http.post(url, paper)
                .then(function (response) {
                    return response.data;
                })
        }
        function getPaperList(uid){
			var url = "/api/getPaperList/" + uid;
			return $http.get(url)
                .then(function (response) {
                console.log(response.data);
                    return response.data;
                })
		}
        function getPaperById(pid){
            var url = "/api/getPaperById/" + pid;
            return $http.get(url)
                .then(function (response) {
                console.log(response.data);
                    return response.data;
                })
        }
        function updatePaper(pid,paper){
			var url = "/api/updatePaper/" + pid;
			return $http.post(url,paper)
                .then(function (response) {
                    return response.data;
                })
		}
		function deletePaper(pid){
			var url = "/api/deletePaper/" + pid;
            return $http.get(url)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                })
		}
    }
})();
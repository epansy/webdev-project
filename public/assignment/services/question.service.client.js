(function () {
    angular
        .module("QuestionListMaker")
        .factory('QuestionService', QuestionService);

    function QuestionService($http) {
        var services = {
            // "createUser": createUser,
            "createQuestion": createQuestion
            
        };
        return services;

		function createQuestion(question,uid){
			var url = "/api/submitQuestion/:" + uid;
			return $http.post(url, question)
                .then(function (response) {
                    return response.data;
                })
		}
        
    }

})();
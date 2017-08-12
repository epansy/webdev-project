(function () {
    angular
        .module("QuestionListMaker")
        .controller("HomepageController", HomepageController);

    function HomepageController(currentUser,$http) {
        var vm = this;
        vm.currentUser = currentUser;
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&APPID=2549a75fa763e5ce516b7a73c78a0fd4";
		$http.get(url)
                .then(function (response) {
					vm.weather = response.data;
					console.log(vm.weather);
                    return vm.weather;
                });
		
    }
})();
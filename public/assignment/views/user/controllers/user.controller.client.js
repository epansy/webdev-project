(function() {
    angular
        .module("QuestionListMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)
		.controller("QuestionListController", QuestionListController)
        .controller("QuestionEditController", QuestionEditController)
        .controller("QuestionEditAlreadyController", QuestionEditAlreadyController)
        .controller("PaperListController", PaperListController)
        .controller("PaperEditController", PaperEditController)
        .controller("PaperEditAlreadyController", PaperEditAlreadyController)
        .controller("PaperPreviewController", PaperPreviewController)
        ;

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            UserService
                // .findUserByCredentials(username, password)
                .login(username, password)
                .then(function (user) {
                        console.log(user);
                        vm.user = user;
                        if(user.roles[0] == "ADMIN"){
                            $location.url("/admin");
                        }
                        else{
                            $location.url("/profile");
                        }
                        
                    },
                    function (error) {
                        vm.error = "Username does not exist.";
                });
        }
    }

    function RegisterController(UserService, $location, $timeout) {
        var vm = this;
        vm.register = register;
        function register(username, password, vpassword,selectValue) {
            if (username === undefined || username === null || username === ""
                || password === undefined || password === "") {
                vm.error = "Username and Passwords cannot be empty.";
                return;
            }
            if (password !== vpassword) {
                vm.error = "Password does not match.";
                return;
            }
            if(selectValue == undefined){
                selectValue = "USER";
            }
            //console.log(selectValue);
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
                                roles:[selectValue]
                            };
                            vm.user = user;
                            // return the promise
                            return UserService
                                .register(user);
                        }
                    })
                .then(
                    function () {
                        
                        if(selectValue == "ADMIN"){
                            $location.url("/admin");
                        }
                        else{
                            $location.url("/profile");
                        }
                    });
        }
    }

    function ProfileController($routeParams, $timeout, $location, UserService, loggedin) {
        var vm = this;
        // vm.uid = $routeParams.uid;
        vm.uid = loggedin._id;
        vm.user = loggedin;

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                }, function () {
                    vm.error = "Unable to remove this user.";
                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                });
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

        function userError(error) {
            vm.error = "User not found";
        }
    }
	function QuestionListController($routeParams, $timeout, $location, UserService, loggedin){
        var vm = this;
		console.log("question");
        vm.uid = loggedin._id;
        vm.questions = [];
        
        vm.deleteQuestion = deleteQuestion;
        UserService
        .getQuestionList(vm.uid)
        .then(
            function (questions) {
                vm.questions = questions;
                console.log(questions);
                $timeout(function () {
                    vm.updated = null;
                }, 3000);
            }

        );
        console.log(vm.questions);
        function deleteQuestion(qid,index){
            UserService
            .deleteQuestion(qid)
            .then(function () {
                console.log("Delete successfully!");
                vm.questions.splice(index,1);
                
            });
            
        }
        
	}
    function QuestionEditController($routeParams, $timeout, $location, UserService,loggedin,$scope){
        var vm = this;
        vm.options = [{'content':""},{'content':""},{'content':""},{'content':""}];
        vm.uid = loggedin._id;
        
        vm.qtypes = [{"index":1,"content":"select" },{"index":2,"content":"fill"} ];
        vm.title = '';
        vm.qtype = 1; 
        vm.qtypestr = '';
        vm.content = '';
        vm.contentnew = '';
        vm.answer = 0;
        vm.answerfill =[];
        vm.answernew = "";
        vm.ansernewarr = [];
        console.log(vm.uid);
        
        vm.removeOption = removeOption;
        vm.toWord = toWord;
        vm.addOption = addOption;
        vm.submit = submit;
        vm.changeOP = changeOP;
        vm.subscirbeCont = subscirbeCont;
       
        function changeOP(){
            console.log(vm.qtype);
        }
        function removeOption(index){
            console.log(index);
            vm.options.splice(index, 1);
        }
        function addOption(){
            vm.options.push({'content': ''});
        }
        function toWord(index){
            return String.fromCharCode(65 + index);
        }
        function subscirbeCont(){
             
            if(vm.qtype == 2){
                vm.answernew = "";
                vm.ansernewarr = [];
                vm.answerfill = vm.content.match(/\$[^\$]{1,}\$/g);
                vm.contentnew = vm.content;
                if(vm.answerfill != null && vm.answerfill.length !=undefined){
                    for(var i =0;i<vm.answerfill.length;i++){
                        vm.contentnew = vm.contentnew.replace(vm.answerfill[i],"_____");
                        vm.answernew = vm.answernew + vm.answerfill[i];
                        vm.ansernewarr.push(vm.answerfill[i].replace("$","").substring(0,vm.answerfill[i].length-2));
                    }
                    console.log(vm.ansernewarr);
                    console.log(vm.content);
                }
            }
        }
        //console.log(vm.content);
        
        
        function submit(){
            console.log(vm.options);
            var question = {};
            if(vm.qtype == 1){
                question = {
                    id: (new Date()).valueOf(),
                    qtype: vm.qtype,
                    name: vm.title,
                    content: vm.content,
                    options: vm.options,
                    answer: vm.answer,
                    uid:vm.uid
                }
            }else{
                question = {
                    id: (new Date()).valueOf(),
                    qtype: vm.qtype,
                    name: vm.title,
                    content: vm.content,
                    options: [{'content': ''}],
                    answer: vm.answernew,
                    uid:vm.uid
                }
            }
            
            console.log(question);
            UserService
                .createQuestion(question,vm.uid)
                .then(function () {
                    vm.updated = "Question saved!";
					$location.url('/questionList');
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });
            
            
        }
        
    }
    function QuestionEditAlreadyController($routeParams, $timeout, $location, UserService,loggedin,$scope){
        var vm = this;
        vm.qid = $routeParams.qid;
        vm.uid = loggedin._id;
        vm.qtypestr = '';
        vm.contentnew = '';
        vm.answer = 0;
        vm.answerfill =[];
        vm.answernew = vm.content;
        console.log(vm.uid);
        
        vm.removeOption = removeOption;
        vm.toWord = toWord;
        vm.addOption = addOption;
        vm.submit = submit;
        vm.changeOP = changeOP;
        vm.subscirbeCont = subscirbeCont;
        UserService
        .getQuestionById(vm.qid)
        .then(
            function (question) {
                vm.question = question;
                console.log(question);
                
                vm.qtype = question.qtype;
                vm.title = question.name;
                vm.content = question.content;
                if(question.options != null){
                    vm.options = question.options;
                }
                vm.answer = question.answer;              
                if(vm.qtype == 2){
                    vm.answernew = "";
                    vm.ansernewarr = [];
                    vm.answerfill = vm.content.match(/\$[^\$]{1,}\$/g);
                    vm.contentnew = vm.content;
                    if(vm.answerfill != null && vm.answerfill.length !=undefined){
                        for(var i =0;i<vm.answerfill.length;i++){
                            vm.contentnew = vm.contentnew.replace(vm.answerfill[i],"_____");
                            vm.answernew = vm.answernew + vm.answerfill[i];
                            vm.ansernewarr.push(vm.answerfill[i].replace("$","").substring(0,vm.answerfill[i].length-2));
                        }
                        console.log(vm.ansernewarr);
                        console.log(vm.content);
                    }
                }
                $timeout(function () {
                    vm.updated = null;
                }, 3000);
            }

        );
       
        function changeOP(){
            console.log(vm.qtype);
        }
        function removeOption(index){
            console.log(index);
            vm.options.splice(index, 1);
        }
        function addOption(){
            vm.options.push({'content': ''});
        }
        function toWord(index){
            return String.fromCharCode(65 + index);
        }
        function subscirbeCont(){
             
            if(vm.qtype == 2){
                vm.answernew = "";
                vm.ansernewarr = [];
                vm.answerfill = vm.content.match(/\$[^\$]{1,}\$/g);
                vm.contentnew = vm.content;
                if(vm.answerfill != null && vm.answerfill.length !=undefined){
                    for(var i =0;i<vm.answerfill.length;i++){
                        vm.contentnew = vm.contentnew.replace(vm.answerfill[i],"_____");
                        vm.answernew = vm.answernew + vm.answerfill[i];
                        vm.ansernewarr.push(vm.answerfill[i].replace("$","").substring(0,vm.answerfill[i].length-2));
                    }
                    console.log(vm.ansernewarr);
                    console.log(vm.content);
                }
            }
        }
        //console.log(vm.content);
        
        
        function submit(){
            console.log("test already");
            console.log(vm.options);
            var question = {};
            if(vm.qtype == 1){
                question = {
                    id: vm.qid,
                    qtype: vm.qtype,
                    name: vm.title,
                    content: vm.content,
                    options: vm.options,
                    answer: vm.answer,
                    uid:vm.uid
                }
            }else{
                question = {
                    id: vm.qid,
                    qtype: vm.qtype,
                    name: vm.title,
                    content: vm.contentnew,
                    options: [{'content': ''}],
                    answer: vm.answernew,
                    uid:vm.uid
                }
            }
            
            console.log(question);
            UserService
                .updateQuestion(vm.qid,question)
                .then(function () {
                    vm.updated = "Question saved!";
					$location.url('/questionList');
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });
            
        }
        
    }
    function PaperListController($routeParams, $timeout, $location, UserService, loggedin){
        var vm = this;
        vm.uid = loggedin._id;
        vm.papers = [];
        UserService
        .getPaperList(vm.uid)
        .then(
            function (papers) {
                vm.papers = papers;
                console.log(papers);
                $timeout(function () {
                    vm.updated = null;
                }, 3000);
            }

        );
        
        vm.deletePaper = deletePaper;
        function deletePaper(pid,index){
            UserService
            .deletePaper(pid)
            .then(function () {
                console.log("Delete successfully!");
                vm.papers.splice(index,1);
                
            });
            
        }
        console.log("paper list");
    }
    function PaperEditController($routeParams, $timeout, $location, UserService,loggedin,$scope){
        var vm = this;
        vm.uid = loggedin._id;
        vm.questions = [];
        
        vm.submit = submit;
        UserService
        .getQuestionList(vm.uid)
        .then(
            function (questions) {
                questions.forEach(function(e){
                    e.checked = false;
                });
                vm.questions = questions;
                console.log(questions);
                $timeout(function () {
                    vm.updated = null;
                }, 3000);
            }

        );
        function submit(){
            vm.questionIds = [];
            vm.questions.forEach(function(e){
                if(e.checked){
                    vm.questionIds.push(e.id);
                }
            });
            
            var paper ={
                id:(new Date()).valueOf(),
                name:vm.name,
                questionIds:vm.questionIds,
                uid:vm.uid
                
            }
            console.log(paper);
            UserService
                .createPaper(paper,vm.uid)
                .then(function () {
                    vm.updated = "Paper saved!";
					$location.url('/paperList');
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });
        }
        
    }
    function PaperEditAlreadyController($routeParams, $timeout, $location, UserService,loggedin,$scope){
        var vm = this;
        vm.uid = loggedin._id;
        vm.questions = [];
        vm.pid = $routeParams.pid;
        vm.submit = submit;
        UserService
        .getPaperById(vm.pid)
        .then(
            function (papers) {
                
                console.log(papers);
                vm.name = papers.name;
                UserService
                    .getQuestionList(vm.uid)
                    .then(
                        function (questions) {
                            questions.forEach(function(e){
                                if($.inArray(e.id, papers.questionIds)>-1){
                                    e.checked = true;
                                }else
                                {
                                    e.checked = false;
                                }
                                
                            });
                            
                            vm.questions = questions;
                            console.log(questions);
                            $timeout(function () {
                                vm.updated = null;
                            }, 3000);
                        }

                    );
                
                
                
                $timeout(function () {
                    vm.updated = null;
                }, 3000);
            }

        );
        
        
        /*UserService
        .getQuestionList(vm.uid)
        .then(
            function (questions) {
                questions.forEach(function(e){
                    e.checked = false;
                });
                vm.questions = questions;
                console.log(questions);
                $timeout(function () {
                    vm.updated = null;
                }, 3000);
            }

        );*/
        function submit(){
            vm.questionIds = [];
            vm.questions.forEach(function(e){
                if(e.checked){
                    vm.questionIds.push(e.id);
                }
            });
            
            var paper ={
                id:vm.pid,
                name:vm.name,
                questionIds:vm.questionIds,
                uid:vm.uid
                
            }
            console.log(paper);
            UserService
                .updatePaper(vm.pid,paper)
                .then(function () {
                    vm.updated = "Paper saved!";
					$location.url('/paperList');
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });
        }
        
    }
    function PaperPreviewController($routeParams, $timeout, $location, UserService,loggedin,$scope){
        var vm = this;
        vm.uid = loggedin._id;
        vm.qselect = [];
        vm.qfill = [];
        vm.pid = $routeParams.pid;
        vm.toWord = toWord;
        UserService
        .getPaperById(vm.pid)
        .then(
            function (papers) {
                
                console.log(papers);
                vm.name = papers.name;
                UserService
                    .getQuestionList(vm.uid)
                    .then(
                        function (questions) {
                            questions.forEach(function(e){
                                if($.inArray(e.id, papers.questionIds)>-1){
                                    if(e.qtype==1){
                                        vm.qselect.push(e);
                                    }else
                                    {
                                        var answernew = "";
                                        var ansernewarr = [];
                                        var answerfill = e.content.match(/\$[^\$]{1,}\$/g);
                                        var contentnew = e.content;
                                        if(answerfill != null && answerfill.length !=undefined){
                                            for(var i =0;i<answerfill.length;i++){
                                                contentnew = contentnew.replace(answerfill[i],"_____");
                                            }
                                            e.content = contentnew;
                                        }
                                        
                                        
                                        vm.qfill.push(e);
                                    }
                                }
                                
                            });
                            console.log(vm.qfill);
                            console.log(vm.qselect);
                            $timeout(function () {
                                vm.updated = null;
                            }, 3000);
                        }

                    );
                
                
                
                $timeout(function () {
                    vm.updated = null;
                }, 3000);
            }

        );
        function toWord(index){
            return String.fromCharCode(65 + index);
        }
    }
    
})();
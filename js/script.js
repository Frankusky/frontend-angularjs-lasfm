function passChecker(password){
	var pattern=/^[a-zA-Z0-9]*$/;
	var matchStatus = pattern.test(password); // a boolean
	if (password.length<=6){
		//alert("Your password is too weak!");
		return "Still Weak. Try a longer password...";
	}else if(matchStatus==false){
		return "Special characters detected. Try another password...";
	}else{
		//alert("Your password have strong strength!");
		return true;
	};
};

//Starting parse
Parse.initialize("o738tDIjX7Oq1jSB1PtSG6LfVeZqOgpaKH0pK3dt", "p7JfKdqPlYwWoenFcH1pnxR73YDzNaHAjz6iAwhq");
//Starting angular and setting routes
var angularTesting = angular.module('angularTesting', ["ngRoute"]).config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'inicio.html'
	})
	.when('/listsongs', {
		controller: 'jsonData',
		templateUrl: 'listsongs.html'
	})
	.otherwise({
		redirectTo: '/'
	});
}).run(['$rootScope', "$location", function($scope, $location) {
	$scope.passStrength = "Weak";
	$scope.currentUser = Parse.User.current();
	$scope.signUp = function(form, newPath) {
		if (passChecker(form.password)==true) {
			var user = new Parse.User();
			user.set("email", form.email);
			user.set("username", form.username);
			user.set("password", form.password);
			
			user.signUp(null, {
				success: function(user) {
					$scope.currentUser = user;
					$location.path(newPath);
					$scope.$apply();
				},
				error: function(user, error) {
					alert("Unable to sign up:  " + error.code + " " + error.message);
				}
			});
		}else{
			$scope.passStrength = passChecker(form.password);
			alert();
		};
	};
	
	$scope.logIn = function(form, newPath) {
		
		Parse.User.logIn(form.username, form.password, {
			success: function(user) {
				$scope.currentUser = user;
				$location.path(newPath);
				$scope.$apply();
			},
			error: function(user, error) {
				alert("Unable to log in: " + error.code + " " + error.message);
			}
		});
		
	};
	
	$scope.logOut = function(form) {
		Parse.User.logOut();
		$scope.currentUser = null;
		$location.path("/inicio");
	};
}]);


//Getting only the url of music object
angularTesting.filter("soloUrl", function(){
	return function(item){
		return (JSON.stringify(item)).slice(10,-18);
	};
});
//Hidding message for forgot password
angularTesting.forgotPass="False";
//Getting json
angularTesting.controller('jsonData', function ($scope, $http) {
	
		$http.get('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=85b8c37b1a6be5182a5ed0549c4a7400&format=json').success(function(data) {
			$scope.track = data.tracks.track;
		});
		$scope.ordenarPor = function(orden) {
			$scope.ordenSeleccionado = orden;
		};

		$scope.filterTypes = [
			{name: "Global", search: "buscar"},
			{name: "Artista", search: "buscar.artist.name"}, 
			{name: "Canción", search: "buscar.name"},
			{name: "Duración", search: "buscar.duration"}
		];
		$scope.selectedFilter = $scope.filterTypes[0];
		
});

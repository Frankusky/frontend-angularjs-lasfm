// Javascript Code.
//para hacer uso de $resource debemos colocarlo al crear el modulo

//Starting angular
var angularTesting = angular.module('angularTesting', []);

//Getting only the url of music object
angularTesting.filter("soloUrl", function(){
	return function(item){
		return (JSON.stringify(item)).slice(10,-18);
	};
});

//Getting json
angularTesting.controller('jsonData', function ($scope, $http) {
	
		$http.get('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=85b8c37b1a6be5182a5ed0549c4a7400&format=json').success(function(data) {
			$scope.track = data.tracks.track;
		});
		$scope.ordenarPor = function(orden) {
			$scope.ordenSeleccionado = orden;
		};
	
	
});

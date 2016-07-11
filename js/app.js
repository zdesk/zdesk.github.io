'use strict';
var getcount = true;
var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "HomeController"})
    // Pages
	.when("/surfer", {templateUrl: "partials/surfer.html", controller: "MovieController"})
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
    .when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
    .when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    // Blog
    .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

app.controller('HomeController',function($scope, $http){
	
		$http.get("http://exp-expservices.rhcloud.com/live", {cache: false})
		  .then(function(response){ console.log("Services are up and running");}, 
		  function(response){$scope.hits = "Service Down"; console.log(response);});
		console.log(getcount);
		
		if(getcount == true){
			$http.get("http://services.eliteofindia.club/hits", {cache: false})
			  .then(function(response){ $scope.hits = response.data.hits; getcount=false;console.log(response);}, function(response){console.log(response);});
		}
	
});


  app.controller('MovieController',function($scope, $http, $interval){
    $scope.$watch('search', function() {
      fetch();
    });
	
	$scope.theTime = new Date().toLocaleTimeString();
	  $interval(function () {
		  $scope.theTime = new Date().toLocaleTimeString();
	  }, 1000);
	
    $scope.search = "Sherlock Holmes";
    function fetch(){
		
		$http.get("http://exp-expservices.rhcloud.com/live", {cache: false})
		.then(function(response){ console.log("Services are up and running");}, 
		function(response){console.log(response);});
		
      $http.get("http://services.eliteofindia.club/maininfo/" + $scope.search, {cache: false})
      .then(function(response){ $scope.details = response.data; });

      $http.get("http://services.eliteofindia.club/relatedinfo/" + $scope.search, {cache: false})
      .then(function(response){ $scope.related = response.data; });
	  
	  /*$http.get("http://exp-expservices.rhcloud.com/hits", {cache: false})
	  .then(function(response){ $scope.hits = response.data.hits; console.log(response.data.hits);}, function(response){console.log(response);});*/

    }

    $scope.update = function(movie){
      $scope.search = movie.Title;	
    };

    $scope.select = function(){
      this.setSelectionRange(0, this.value.length);
    }
  });
  app.directive("btnAutoCollapse",directive);
  
  function directive() {
  var dir = {
    restrict: 'A',
    scope: {},
    link: link
  };
  return dir;

  function link(scope, element, attrs) {    
    element.on('click', function(event) {              
      $(".navbar-collapse").collapse('hide');
    });
  }
}
  

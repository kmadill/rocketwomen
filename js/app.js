// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('rocketwomen', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    superfeedr.auth('kmadill', '71c25177b4bfdde3380ca899fe1b245d');
    superfeedr.setOnLoadCallback(feederInit);

    
    localStorage.setItem('phonegaptest', 'yes');
    var testLS = localStorage.getItem('phonegaptest');

    if (testLS == null) {
      alert('No Local Storage');
    }
    else {
      alert('Yes, Local Storage');
    }
    

  });
});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'rocketCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'about.html',
      controller: 'rocketCtrl'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'contact.html',
      controller: 'rocketCtrl'
    });

    $urlRouterProvider.otherwise('/home');
});

app.controller('rocketCtrl', function($scope, $ionicSideMenuDelegate){
  $scope.toggleMenu = function(){
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.loadFeeds = function(){
    var feeds = JSON.parse(localStorage.getItem('feeds'));
    console.log(feeds.feed.entries[1].title);

    var output = '';

    for (i = 0; i < feeds.feed.entries.length; i++) { 
      output += '<a href="'+ feeds.feed.entries[i].link +'" target = "_blank" class="item item-icon-right"><i class="icon ion-arrow-right-c"></i>' + 
              feeds.feed.entries[i].title + '</a>';
    }
            
    return output;

  }
});

function feederInit(){
  var output = '';
    var feed = new superfeedr.Feed("http://rocket-women.com/feed/");   
    feed.setNumEntries(5);

    feed.load(function(result){
      console.log(result);
      localStorage.setItem('feeds', JSON.stringify(result));
    });

}
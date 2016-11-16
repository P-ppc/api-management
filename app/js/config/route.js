AppModule.config(function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: '/static/tpl/home.html',
        controller: 'homeController'
    });
});
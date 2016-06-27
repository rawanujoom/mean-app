(function() {
    'use strict';

    function Ravan($stateProvider) {
        $stateProvider.state('ravan example page', {
            url: '/ravan/example',
            templateUrl: 'ravan/views/index.html'
        }).state('ravan circles example', {
            url: '/ravan/example/:circle',
            templateUrl: 'ravan/views/example.html'
        });
    }

    angular
        .module('mean.ravan')
        .config(Ravan);

    Ravan.$inject = ['$stateProvider'];

})();

(function() {
    'use strict';

    function Article($stateProvider) {
        $stateProvider.state('article page', {
            url: '/article',
            templateUrl: 'article/views/index.html'
        }).state('article view', {
            url: '/article/view/:articleId',
            templateUrl: 'article/views/view.html'
        })
    }

    angular
        .module('mean.article')
        .config(Article);

    Article.$inject = ['$stateProvider'];

})();

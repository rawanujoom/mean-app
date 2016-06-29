(function() {
    'use strict';

    function ArticleViewController($scope, Global, $stateParams, $http, MeanUser) {
        $scope.global = Global;
        $http.get('/api/article/' + $stateParams.articleId)
            .success(function(res) {
                $scope.article = res;
            });
        $scope.user = MeanUser.user;

    }

    angular
        .module('mean.article')
        .controller('ArticleViewController', ArticleViewController);

    ArticleViewController.$inject = ['$scope', 'Global', '$stateParams', '$http', 'MeanUser'];

})();
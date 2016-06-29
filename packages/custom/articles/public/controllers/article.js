(function() {
    'use strict';

    function ArticleController($scope, Global, $stateParams, $http, MeanUser) {
        $scope.global = Global;
        $http.get('/api/article')
            .success(function(res) {
                $scope.articles = res;
            });
        $scope.user = MeanUser.user;
        $scope.newArticle = '';
        $scope.addArticle = function() {
            if ($scope.newArticle.length != 0) {
                $http.post('/api/article/create',{article: $scope.newArticle})
                    .success(function(res) {
                        $scope.articles.unshift(res);
                        console.log($scope.articles);
                        $scope.newArticle = '';
                    });                
            }           
        }
       

    }

    angular
        .module('mean.article')
        .controller('ArticleController', ArticleController);

    ArticleController.$inject = ['$scope', 'Global', '$stateParams', '$http', 'MeanUser'];

})();
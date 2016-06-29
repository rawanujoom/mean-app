(function() {
    'use strict';

    function CommentController($scope, Global, $stateParams, $http, MeanUser) {
        $scope.global = Global;
        $http.get('/api/comments/' + $stateParams.articleId)
            .success(function(res) {
                $scope.comments = res;
            });
        $scope.user = MeanUser.user;
        $scope.newComment = '';
        $scope.addComment = function() {
            if ($scope.newComment.length != 0) {
                $http.post('/api/comment/create/' + $stateParams.articleId,{comment: $scope.newComment})
                    .success(function(res) {
                        $scope.comments.unshift(res);
                        $scope.newComment = '';
                    });                
            }           
        }
       

    }
    CommentController.$inject = ['$scope', 'Global', '$stateParams', '$http', 'MeanUser'];

    angular
        .module('mean.article')
        .directive('comments', function() {
            return {
                restrict : 'E',
                templateUrl: 'article/views/comments.html',
                controller : CommentController
            }
        });


})();
(function() {
    'use strict';

    /* jshint -W098 */

    function RavanController($scope, Global, Ravan, $stateParams, $http) {
        $scope.global = Global;
        $scope.package = {
            name: 'ravan'
        };
        $http.get('/api/ravooneh')
            .success(function(res) {
                $scope.comments = res;
            });
        $scope.checkCircle = function() {
            Ravan.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
        $scope.newComment = '';
        $scope.addComment = function() {
            if ($scope.newComment.length != 0) {
                $http.post('/api/ravooneh/create',{comment: $scope.newComment})
                    .success(function(res) {
                        $scope.comments.push($scope.newComment);
                    });
                
            }           
        }

    }

    angular
        .module('mean.ravan')
        .controller('RavanController', RavanController);

    RavanController.$inject = ['$scope', 'Global', 'Ravan', '$stateParams', '$http'];

})();

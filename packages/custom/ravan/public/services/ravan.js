(function() {
    'use strict';

    function Ravan($http, $q) {
        return {
            name: 'ravan',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/ravan/example/' + circle).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            }
        };
    }

    angular
        .module('mean.ravan')
        .factory('Ravan', Ravan);

    Ravan.$inject = ['$http', '$q'];

})();

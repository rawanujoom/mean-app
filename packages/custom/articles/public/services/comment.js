// (function() {
//     'use strict';

//     function Comment($http, $q) {
//         return {
//             name: 'comment',
//             checkCircle: function(circle) {
//                 var deferred = $q.defer();

//                 $http.get('/api/comment/example/' + circle).success(function(response) {
//                     deferred.resolve(response);
//                 }).error(function(response) {
//                     deferred.reject(response);
//                 });
//                 return deferred.promise;

//             }
//         };
//     }

//     angular
//         .module('mean.comment')
//         .factory('Comment', Comment);

//     Comment.$inject = ['$http', '$q'];

// })();

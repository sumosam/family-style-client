(function () {
  angular
    .module('app')
    .factory('usersService', usersService);

  usersService.$inject = ['$http', '$window', '$state'];

  function usersService($http, $window, $state) {
    var service = {
      signin: signin,
      getUserId: getUserId
    };

    return service;

    function signin (username) {
      return $http.post('http://localhost:8080/users/', {username: username})
      .then(signinComplete)
      .catch(signinFailed);

      function signinComplete(response) {
        $window.localStorage['userid'] = response.data._id;
        $state.go('search');
      }

      function signinFailed(error) {
        console.error(error.data);
      }
    }

    function getUserId() {
      return $window.localStorage['userid'];
    }
  }
})();

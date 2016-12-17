mainApp.factory('AppService', function($http, $q) {

  var factory = {}; 

  factory.addUser = function(user) {
      var deferred = $q.defer();
          $http.post('/api/addUser', user)
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function(data) {
              console.log('Error: ' + data);
              deferred.reject();
          });
          return deferred.promise;
     };

  factory.signInUser = function(email, password) {
          var user = {Email:email, Password:password}
          var deferred = $q.defer();
          $http.get('/api/signInUser/' + email + '/and/' + password)
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function(data) {
              console.log('Error: ' + data);
              deferred.reject();
          });
          return deferred.promise;
  }
  factory.getUserDetails = function(email) {
      var deferred = $q.defer();
          $http.get('/api/getUser/' + email)
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function(data) {
              console.log('Error: ' + data);
              deferred.reject();
          });
          return deferred.promise;
  }

  factory.updateUserDetails = function(_id, user) {
      var deferred = $q.defer();
          $http.put('/api/updateUser/' + _id, user)
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function(data) {
              console.log('Error: ' + data);
              deferred.reject();
          });
          return deferred.promise;
     }
  factory.deleteUser = function(_id) {
      var deferred = $q.defer();
          $http.delete('/api/deleteUser/' + _id)
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function(data) {
              console.log('Error: ' + data);
              deferred.reject();
          });
          return deferred.promise;
  }
  
  factory.loggedUserData = function(){
    return {
      data: {
        user: ''
      },
      update: function(data) {
        this.data.user = data;
        console.log(this.data.user);
      }
    }
  };
   return factory;
}); 
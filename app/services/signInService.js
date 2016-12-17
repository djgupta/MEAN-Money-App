mainApp.factory('signInService', function(){
  return {
      data: {
        user: ''
      },
      update: function(data) {
        this.data.user = data;
      }
    }
});

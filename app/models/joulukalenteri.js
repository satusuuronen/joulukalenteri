
(function() {
    if ( typeof angular == 'undefined' ) {
	    return;
    };

    var module = angular.module('JoulukalenteriModel', ['restangular']);

    module.factory('JoulukalenteriRestangular', function(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('http://localhost/data');
            RestangularConfigurer.setRequestSuffix('.json');
            RestangularConfigurer.setRestangularFields({
                id: "id"
            });
        });
    });
})();

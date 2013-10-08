var joulukalenteriApp = angular.module('joulukalenteriApp', ['JoulukalenteriModel', 'hmTouchevents']);

joulukalenteriApp.controller('IndexCtrl', function ($scope, JoulukalenteriRestangular) {
    var date = new Date();
    $scope.open = function(id) {
        if (date.getMonth() != 11) {
            var webView = new steroids.views.WebView("/views/joulukalenteri/modalNoSeason.html");
            steroids.modal.show(webView);
            return;
        }
        if (date.getDate() < id) {
            var webView = new steroids.views.WebView("/views/joulukalenteri/modalDecember.html?id=" + id);
            steroids.modal.show(webView);
            return;
        }    
        var anim = new steroids.Animation("curlUp");
        var webView = new steroids.views.WebView("/views/joulukalenteri/show.html?id="+id);
        steroids.layers.push({
            view: webView,
            animation: anim
        });
    };
    $scope.days = JoulukalenteriRestangular.all('joulukalenteri').getList();
    steroids.view.navigationBar.show("Joulukalenteri");
});


joulukalenteriApp.controller('ShowCtrl', function ($scope, $filter, JoulukalenteriRestangular) {
    JoulukalenteriRestangular.all('joulukalenteri').getList().then( function(joulukalenteris) {
        $scope.day = $filter('filter')(joulukalenteris, {id: steroids.view.params['id']})[0];
    });
    steroids.view.navigationBar.show("December " + $filter('ordinal')(steroids.view.params.id));
    $scope.previewImage = function () {
        var fileView = new steroids.views.PreviewFileView($scope.day.image);
        steroids.modal.show(fileView);
    };
});

joulukalenteriApp.controller('ModalNoSeasonCtrl', function ($scope) {
    var date = new Date();
    var decemberFirst = new Date(date.getFullYear(), 11, 1);
    $scope.timeToGo = Math.ceil((decemberFirst.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    $scope.close = function () {
        steroids.modal.hide();
    };
});

joulukalenteriApp.controller('ModalDecemberCtrl', function ($scope) {
    $scope.day = steroids.view.params.id;   
    $scope.close = function () {
        steroids.modal.hide();
    };
});


joulukalenteriApp.filter('ordinal', function() {
    //Works only for 1<= number <=24
    return function(number) {
        if (number == 1 || number == 21) {
            return number + 'st';
        }
        else if (number == 2 || number == 22) {
            return number + 'nd';
        }
        else if (number == 3 || number == 23) {
            return number + 'rd';   
        } 
        else {
            return number + 'th';
        }
    };
});


angular.module('app.controllers', [])

.controller('homeLoginCtrl', ['$scope', '$rootScope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $stateParams) {
        $rootScope.logout = function() {
            $rootScope.auth.$logout();
            $rootScope.checkSession();
        };

        $rootScope.checkSession = function() {
            var auth = new FirebaseSimpleLogin(authRef, function(error, user) {
                if (error) {
                    // no action yet.. redirect to default route
                    $rootScope.userEmail = null;
                    $window.location.href = '#/page1/page6';
                } else if (user) {
                    // user authenticated with Firebase
                    $rootScope.userEmail = user.email;
                    $window.location.href = ('#/page1/page2');
                } else {
                    // user is logged out
                    $rootScope.userEmail = null;
                    $window.location.href = '#/page1/page6';
                }
            });
        }

    }
])

.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('yourSurveysCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('activeSurveysCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('linksCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('loginCtrl', ['$scope', '$rootScope', '$firebaseAuth', '$window',
    function($scope, $rootScope, $firebaseAuth, $window) {
        // check session
        $rootScope.checkSession();
        $scope.user = {
            email: "",
            password: ""
        };
        $scope.validateUser = function() {
            $rootScope.show('Please wait.. Authenticating');
            var email = this.user.email;
            var password = this.user.password;
            if (!email || !password) {
                $rootScope.notify("Please enter valid credentials");
                return false;
            }
            $rootScope.auth.$login('password', {
                    email: email,
                    password: password
                })
                .then(function(user) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    $window.location.href = ('/page1/page2'); //
                }, function(error) {
                    $rootScope.hide();
                    if (error.code == 'INVALID_EMAIL') {
                        $rootScope.notify('Invalid Email Address');
                    } else if (error.code == 'INVALID_PASSWORD') {
                        $rootScope.notify('Invalid Password');
                    } else if (error.code == 'INVALID_USER') {
                        $rootScope.notify('Invalid User');
                    } else {
                        $rootScope.notify('Oops something went wrong. Please try again later');
                    }
                });
        }
    }
])

.controller('signupCtrl', ['$scope', '$rootScope', '$firebaseAuth', '$window',
    function($scope, $rootScope, $firebaseAuth, $window) {
        $scope.user = {
            email: "",
            password: ""
        };
        $scope.createUser = function() {
            var email = this.user.email;
            var password = this.user.password;

            if (!email || !password) {
                $rootScope.notify("Please enter valid credentials");
                return false;
            }

            $rootScope.show('Please wait.. Registering');
            $rootScope.auth.$createUser(email, password, function(error, user) {
                if (!error) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    $window.location.href = ('/page1/page5');
                } else {
                    $rootScope.hide();
                    if (error.code == 'INVALID_EMAIL') {
                        $rootScope.notify('Invalid Email Address');
                    } else if (error.code == 'EMAIL_TAKEN') {
                        $rootScope.notify('Email Address already taken');
                    } else {
                        $rootScope.notify('Oops something went wrong. Please try again later');
                    }
                }
            });
        }
    }
])

.controller('createSurveyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('surveyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('surveyAnalyticsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('surveyInfoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('createQuestionCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])
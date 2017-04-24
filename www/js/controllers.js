angular.module('app.controllers', [])

.controller('homeLoginCtrl', ['$scope', '$rootScope', '$stateParams', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $stateParams, $window) {
        /*$rootScope.logout = function() {
            $rootScope.auth.$logout();
            $window.location.href = ('#/page8');
        }*/
        firebase.auth().signOut().then(function() {
            $window.location.href = ('#/page8');

            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    console.log("Sign In Success", user);
                } else {
                    console.log("NOT SIGNED IN!", user);
                }
            });

        }).catch(function(error) {
            // An error happened.
        });
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
            //$scope.name = "";
            //$scope.names = "";
            //var emails;
            // check session

            //$rootScope.checkSession();
            $scope.user = {
                email: "",
                password: ""
            };
            /*firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // ...
                    });*/

            $scope.validateUser = function() {
                    //$rootScope.show('Please wait.. Authenticating');
                    var email = this.user.email;
                    var password = this.user.password;
                    //$scope.name = this.user.email;
                    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;

                        if (!error) {
                            $rootScope.hide();
                            $rootScope.userEmail = user.email;
                            console.log("(Login) RootScope.getAuth: " + $rootScope.getAuthEmailPass + " - rootScoprAuth:" + $rootScope.auth.getAuth().password.email);
                            //$window.location.href = ('/page1/page5');
                            $window.location.href = ('#/page5');
                        } else if (error.code == 'INVALID_EMAIL') {
                            $rootScope.notify('Invalid Email Address');
                        } else if (error.code == 'EMAIL_TAKEN') {
                            $rootScope.notify('Email Address already taken');
                        } else {
                            $rootScope.notify('Oops something went wrong. Please try again later');
                        }

                    });
                }
                /*$rootScope.auth.$login('password', {
                        email: email,
                        password: password
                    })
                    .then(function (user) {
                        $rootScope.hide();
                        $rootScope.userEmail = user.email;
                        //$scope.names = user.email;
                        //$scope.namez = $rootScope.userEmail;
                        //var el = document.getElementById('content').textContent;
                        //$window.location.href = ('/page1/page2'); //
                        $window.location.href = ('#/page2');
                    }, function (error) {
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
            }*/

        }
    ])
    /* const user = firebase.auth().currentUser;
const credential = firebase.auth.EmailAuthProvider.credential(
    user.email, 
    userProvidedPassword
);

             // Prompt the user to re-provide their sign-in credentials

             user.reauthenticate(credential).then(function() {
                 // User re-authenticated.
             }, function(error) {
                 // An error happened.
             });*/

//mport user from a json file
//firebase auth:import users.json --hash-algo=scrypt --rounds=8 --mem-cost=14

.controller('signupCtrl', ['$scope', '$rootScope', '$firebaseAuth', '$window',
    function($scope, $rootScope, $firebaseAuth, $window) {
        $scope.user = {
            email: "",
            password: ""
        };

        $scope.createUser = function() {
            var email = this.user.email;
            var password = this.user.password;

            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (!error) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    console.log("RootScope.getAuth: " + $rootScope.getAuthEmailPass + " - rootScoprAuth:" + $rootScope.auth.getAuth().password.email);
                    //$window.location.href = ('/page1/page5');
                    $window.location.href = ('#/page5');
                } else if (error.code == 'INVALID_EMAIL') {
                    $rootScope.notify('Invalid Email Address');
                } else if (error.code == 'EMAIL_TAKEN') {
                    $rootScope.notify('Email Address already taken');
                } else {
                    $rootScope.notify('Oops something went wrong. Please try again later');
                }
            });

            /*firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });*/
            /*$rootScope.show('Please wait.. Registering');
            $rootScope.auth.$createUser(email, password, function(error, user) {
                if (!error) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    //$window.location.href = ('/page1/page5');
                    $window.location.href = ('#/page5');
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
});*/
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
    /*
    .controller('ExampleController', ['$scope', '$rootScope', '$firebaseAuth', function($scope, $rootScope, $firebaseAuth) {
        $scope.name = 'Whirled';
        $rootScope.userEmail = user.email;
    }]);*/
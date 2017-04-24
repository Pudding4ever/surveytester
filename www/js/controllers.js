angular.module('app.controllers', [])

.controller('homeLoginCtrl', ['$scope', '$rootScope', '$stateParams', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $stateParams, $window) {
        var user = firebase.auth().currentUser;
        var baseUrl = 'https://ionic-survey-app.firebaseio.com/';
        var ref = new Firebase(baseUrl);
        var email;

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log("Sign In Success", user);
                if (user != null) {
                    email = user.email;
                    document.getElementById("demo").innerHTML = user.email;
                    document.getElementById("memo").innerHTML = email;
                } else {
                    email = "Anonymous";
                    document.getElementById("demo").innerHTML = "Anonymous";
                    document.getElementById("memo").innerHTML = "Anonymous";
                }
            } else {
                console.log("NOT SIGNED IN!", user);
            }

            $rootScope.logout = function() {
                firebase.auth().signOut().then(function() { //fix
                    firebase.auth().onAuthStateChanged(function(user) {
                        if (user) {
                            console.log("LOGGING OUT!", user);
                            $window.location.href = ('#/page8'); //see if this show be in inner or outer function
                        } else {
                            console.log("LOGGING OUT!", user);
                            $window.location.href = ('#/page8'); //see if this show be in inner or outer function

                        }
                    });

                }).catch(function(error) {
                    alert(error.code + " - " + error.message);
                    $window.location.href = ('#/page8'); //see if this show be in inner or outer function
                });
            }

            /* const user = firebase.auth().currentUser;
const credential = firebase.auth.EmailAuthProvider.credential(
    user.email, 
    userProvidedPassword
); -- use ng-bind for that variabele to parse to homeLogin*/
        })
    }
])

.controller('homeCtrl', ['$scope', '$rootScope', '$stateParams', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $stateParams, $window) {
        $rootScope.anon = function() {
                firebase.auth().signInAnonymously().catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    if (errorCode === 'auth/operation-not-allowed') {
                        alert('You must enable Anonymous auth in the Firebase Console.');
                    } else {
                        alert(error.code + " - " + error.message);
                    }
                });
            } //- do a guest button on home screen

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
                            console.log("(Login)rootScopeAuth:" + $rootScope.auth.getAuth().password.email);
                            //$window.location.href = ('/page1/page5');
                            $window.location.href = ('#/page2');
                        } else {
                            switch (error.code) {
                                case 'auth/invalid-email':
                                    {
                                        alert(error.code + " - " + error.message);
                                        //$window.location.href = ('#/page5');
                                        break;
                                    }
                                case 'auth/user-not-found':
                                    {
                                        alert(error.code + " - " + error.message);
                                        //$window.location.href = ('#/page5');
                                        break;
                                    }
                                case 'auth/wrong-password':
                                    {
                                        alert(error.code + " - " + error.message);
                                        //$window.location.href = ('#/page5');
                                        break;
                                    }
                                case 'auth/user-not-found':
                                    {
                                        alert(error.code + " - " + error.message);
                                        //$window.location.href = ('#/page5');
                                        break;
                                    }
                                default:
                                    {
                                        alert(error.code + " - " + error.message);
                                        //$window.location.href = ('#/page5');
                                        break;
                                    }
                            }
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
                } else {
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            {
                                alert(error.code + " - " + error.message);
                                //$window.location.href = ('#/page6');
                                break;
                            }
                        case 'auth/invalid-email':
                            {
                                alert(error.code + " - " + error.message);
                                //$window.location.href = ('#/page6');

                                break;
                            }
                        case 'auth/email-already-in-use':
                            {
                                alert(error.code + " - " + error.message);
                                //$window.location.href = ('#/page6');
                                break;
                            }
                        case 'auth/weak-password':
                            {
                                alert(error.code + " - " + error.message);
                                //$window.location.href = ('#/page6');

                                break;
                            }
                        default:
                            {
                                alert(error.code + " - " + error.message);
                                //$window.location.href = ('#/page6');

                                break;
                            }
                    }
                }
                /*
                                    if (error.code == 'INVALID_EMAIL') {
                                        alert(error.code);
                                    } else if (error.code == 'EMAIL_TAKEN') {
                                        alert(error.code);
                                    } else {
                                        alert(error.code);
                                    }*/
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
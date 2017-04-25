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
                    document.getElementById("memo").innerHTML = email;
                } else {
                    document.getElementById("memo").innerHTML = 'Anonymous';
                }
            } else {
                console.log("Hello ANONYMOUS", user);
            }
        });

        $rootScope.logout = function() {
            firebase.auth().signOut().then(function() { //fix

                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        console.log("LOGGING OUT! - User", user);
                        //$window.location.href = ('#/page8'); //see if this show be in inner or outer function
                    } else {
                        console.log("LOGGING OUT! - User:Null", user);
                        $window.location.href = ('#/page8'); //see if this show be in inner or outer function
                    }
                });

            }).catch(function(error) {
                alert(error.code + " - " + error.message);
                //$window.location.href = ('#/page8'); //see if this show be in inner or outer function
            });
        };
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
        };

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

        $scope.user = {
            email: "",
            password: ""
        };

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
                    //$window.location.href = ('/page1/page5');
                    $window.location.href = ('#/page2');
                    console.log("(Login):" + user);
                } else {
                    switch (error.code) {
                        case 'auth/invalid-email':
                            {
                                alert(error.code + " - " + error.message);
                                $window.location.href = ('#/page5');
                                break;
                            }
                        case 'auth/user-not-found':
                            {
                                alert(error.code + " - " + error.message);
                                $window.location.href = ('#/page5');
                                break;
                            }
                        case 'auth/wrong-password':
                            {
                                alert(error.code + " - " + error.message);
                                $window.location.href = ('#/page5');
                                break;
                            }
                        case 'auth/user-not-found':
                            {
                                alert(error.code + " - " + error.message);
                                $window.location.href = ('#/page5');
                                break;
                            }
                        default:
                            {
                                alert(error.code + " - " + error.message);
                                $window.location.href = ('#/page5');
                                break;
                            }
                    }
                }

            });
        };
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

            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (!error) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    //$window.location.href = ('/page1/page5');
                    $window.location.href = ('#/page5');
                    console.log("(Login):" + user);
                } else {
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            {
                                alert(error.code + " - " + error.message);
                                $window.location.href = ('#/page6');
                                break;
                            }
                        case 'auth/invalid-email':
                            {
                                alert(error.code + " - " + error.message);
                                $window.location.href = ('#/page6');

                                break;
                            }
                        case 'auth/email-already-in-use':
                            {
                                alert(error.code + " - " + error.message);
                                $window.location.href = ('#/page6');
                                break;
                            }
                        case 'auth/weak-password':
                            {
                                alert(error.code + " - " + error.message);
                                $window.location.href = ('#/page6');

                                break;
                            }
                        default:
                            {
                                alert(error.code + " - " + error.message);
                                $window.location.href = ('#/page6');

                                break;
                            }
                    }
                }
            });

        };
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
var app = angular.module("myApp",["ngRoute"]);
//1. Cấu hình Route
app.config(function($routeProvider){
    $routeProvider
    .when("/home", {
        templateUrl: "pages/home.html"
    })
    .when("/product", {
        templateUrl: "pages/product.html",
        controller: "myCtrl"
    })
    .when("/product/:type", {
        templateUrl: "pages/product.html",
        controller: "myCtrl"
    })
    .when("/gallery", {
        templateUrl: "pages/gallery.html",
        controller: "myCtrl"
    })
    .when("/contact", {
        templateUrl: "pages/contact.html",
        controller: "myCtrl"
    })
    .when("/blogNews", {
        templateUrl: "pages/blogNews.html",
        controller: "myCtrl"
    })
    .when("/login", {
        templateUrl: "pages/login.html",
        controller: "myCtrl"
    })
    .when("/register", {
        templateUrl: "pages/register.html",
        controller: "myCtrl"
    })
    .when("/aboutUs", {
        templateUrl: "pages/aboutUs.html",
        controller: "myCtrl"
    })
    .when("/more/:tab?", {
        templateUrl: "pages/more/more.html",
        controller: "myCtrl"
    })
    // .when("/more/FAQ", {
    //     templateUrl: "pages/more/FAQ.html",
    //     controller: "myCtrl"
    // })
    // .when("/more/siteMap", {
    //     templateUrl: "pages/more/siteMap.html",
    //     controller: "myCtrl"
    // })
    .when("/dashboard", {
        templateUrl: "pages/dashboard.html",
        controller: "myCtrl"
    })
    .when("/userInfo", {
        templateUrl: "pages/userInfo.html",
        controller: "myCtrl"
    })
    .otherwise({
        redirectTo: '/home'
    })
});
app.controller("myCtrl", function($scope, $http, $routeParams, $location, $window , $rootScope){
    //2.1. Khai báo hàm đọc data từ file JSON (Read - R)
    function getData(){
        $http.get("LightsDB.json")
        .then(function (rspt){
            if(sessionStorage.getItem("sesProducts") == null){
                //Ghi giá trị vào session Storage
                sessionStorage.setItem("sesProducts", JSON.stringify(rspt.data));
                //Đọc data từ Session Storage đổ vào biến productList
                $scope.productList = JSON.parse(sessionStorage.getItem("sesProducts"));
            }
            else {
                 //Đọc data từ Session Storage đổ vào biến productList
                 $scope.productList = JSON.parse(sessionStorage.getItem("sesProducts"));
            }
        });
    }
    //2.2. Gọi hàm getData để load dữ liệu vào danh sách
    getData();
    //2.3. 
    // $scope.showDetail = function(data){
    //     // sessionStorage.removeItem("detail");
    //     sessionStorage.setItem("detail", JSON.stringify(data));
    //     $scope.productDetail = JSON.parse(sessionStorage.getItem("detail"));
    //     $location.path('/detail/:id');
    // }
    // $scope.selectedProduct = function(id){
    //     for (var i = 0; i < $scope.productList.length; i++){
    //         if($scope.userList[i].id == id){
    //             return $scope.userList[i];
    //         }
    //     }
    // }
    // $scope.showDetail = function (){
    //     product = selectedProduct(data.id)
    //     if(product){
    //         sessionStorage.setItem("detail", JSON.stringify(data));
    //         $scope.productDetail = JSON.parse(sessionStorage.getItem("detail"));
    //     }   
    // }

    //3.1. Khai báo hàm đọc data từ file JSON
    $rootScope.isLogin = false;
    function getUser(){
        $http.get("UserDB.json")
        .then(function(rspt){
            if(sessionStorage.getItem("sesUsers") == null){
                sessionStorage.setItem("sesUsers", JSON.stringify(rspt.data));
                $scope.userList = JSON.parse(sessionStorage.getItem("sesUsers"));
            }
            else{
                $scope.userList = JSON.parse(sessionStorage.getItem("sesUsers"));
            }
            if(sessionStorage.getItem("login")){
                $rootScope.isLogin = true;
            }
        })
    }
    getUser();
    $scope.login = function(){
        var user = checkLogin($scope.userModel.username, $scope.userModel.password);
        if(user){
            sessionStorage.setItem('login',JSON.stringify(user));
            $rootScope.isLogin = true;
            $location.path('/');
        }else{
            $rootScope.isLogin = false;
            alert('Invalid account information !!!');
        }
    }
    function checkLogin(username, pass){
        for (var i = 0; i < $scope.userList.length; i++){
            if( $scope.userList[i].username === username && $scope.userList[i].password === pass){
                return $scope.userList[i];
            }
        }
        return false;
    }
    // Chuyển đổi biến login ở session Storage thành biến userData
    $scope.userData = JSON.parse(sessionStorage.getItem("login"));
    // Sign Out
    $scope.signOut = function(){
        sessionStorage.removeItem('login');
        $rootScope.isLogin = false;
    }

    //2.5.1 Sửa record ( U - Update)
    //a. Chọn record trong danh sách
    $scope.btnUpdate = true;
    $scope.getRecord = function(user){
        $scope.userData.id = user.id;
        $scope.userModel.fullname = user.fullname;
        $scope.userModel.email = user.email;
        $scope.userModel.phone = user.phone;
        $scope.userModel.gen = user.gen;
        $scope.userModel.country = user.country;
        $scope.btnUpdate = false;
    }
    //b. Sửa record
    $scope.updateData = function(){
        var msg = "Are you sure to update this record?";
        $.grep($scope.userData, function(e){
            if(e.id == $scope.userData.id){
                if(confirm(msg)){
                    e.fullname = $scope.userModel.fullname;
                    e.email = $scope.userModel.email;
                    e.phone = $scope.userModel.phone;
                    e.gen = $scope.userModel.gen;
                    e.country = $scope.userModel.country;
                    $scope.btnUpdate = true;
                    setStorage();
                }
            }
        })
    }
    function setStorage(){
        var data = JSON.stringify($scope.userList);
        sessionStorage.setItem("sesUsers", data);
    }
    // Add "Active Class"     
    $scope.getClass = function(path){
        return ($location.path().substr(0,path.length) === path) ? 'active' : '';
    }
    //Get params type => show title product
    if ($routeParams.type === "body") {
        $scope.title = "BODY";
        $scope.type = $scope.title;
    }
    else if($routeParams.type === "face") {
        $scope.title = "FACE";
        $scope.type = $scope.title;
    }
    else if($routeParams.type === "men") {
        $scope.title = "MEN";
        $scope.type = $scope.title;
    }
    else if($routeParams.type === "Exfoliators") {
        $scope.title = "Body Exfoliators";
        $scope.type = $scope.title;
    }
    else if($routeParams.type === "Contouring") {
        $scope.title = "Body Contouring";
        $scope.type = $scope.title;
    }
    else{
        $scope.title = "";
    }
})

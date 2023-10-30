var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
    $scope.order = 'Name';
    $scope.orderss = [{"asc":"Name","desc":"-Name"}];
    $scope.sortt =()=>{
        if($scope.order ==  'Name'){
            $scope.order = '-Name';
        }else{
            $scope.order = 'Name';
        }
    }

    $scope.allUsers = [];
    $scope.addBtn = true;
    $scope.updBtn = false;
    $scope.listData = () => {
        $http.get('/api/datas').then((resp) => {
            $scope.allUsers = resp.data
        });
    }
    $scope.addData = () => {
        $http.post('/api/addData', $scope.user).then((resp) => {
            $scope.listData();
            $scope.user = {};
        })
    }

    $scope.delete = (id) => {
        $http.delete(`/api/delete/${id}`).then((resp) => {
            console.log(resp);
            $scope.listData();
        });
    };

    $scope.edit = (item) => {
        $scope.user = item;
        $scope.addBtn = false;
        $scope.updBtn = true;
    };

    $scope.updateData = async () => {
        $http.put('/api/update', $scope.user).then((resp) => {
            $scope.listData();
            $scope.user = {};
            $scope.addBtn = true;
            $scope.updBtn = false;
        })
    };

    $scope.listData();
});
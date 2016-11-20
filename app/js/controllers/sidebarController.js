AppModule.controller('sidebarController', function ($scope) {
    var URL = {
        history: "/static/tpl/sidebar.history.html",
        project:  "/static/tpl/sidebar.project.html"
    };
    $scope.sidebar = {
        url: URL.project,
        tab: {
            history: 'HISTORY',
            project: 'PROJECT',
        },
        class: {
            history: "",
            project: "selected"
        }
    };
    $scope.switchTab = function (tabName) {
        if (tabName === $scope.sidebar.tab.history) {
            $scope.sidebar.url = URL.history;
            $scope.sidebar.class.history = "selected";
            $scope.sidebar.class.project = "";
        } else if (tabName === $scope.sidebar.tab.project) {
            $scope.sidebar.url = URL.project;
            $scope.sidebar.class.history = "";
            $scope.sidebar.class.project = "selected";
        }
    };

    $scope.project = [
        {type: "api", title: "first api!"},
        {type: "api", title: "second api!"},
        {type: "api", title: "3rd api!"},
        {type: "api", title: "4th api!"}
    ];


});
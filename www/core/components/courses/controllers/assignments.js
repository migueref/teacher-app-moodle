// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

angular.module('mm.core.courses')

/**
 * Controller to handle the courses list.
 *
 * @module mm.core.courses
 * @ngdoc controller
 * @name mmCoursesListCtrl
 */
.controller('mmAssignmentsCtrl', function($scope, $mmCourses, $mmCoursesDelegate, $mmUtil, $mmEvents, $mmSite, $q,
            mmCoursesEventMyCoursesUpdated, mmCoursesEventMyCoursesRefreshed, mmCoreEventSiteUpdated,$http,$sce) {

    var updateSiteObserver,
        myCoursesObserver;
    $scope.searchEnabled = $mmCourses.isSearchCoursesAvailable() && !$mmCourses.isSearchCoursesDisabledInSite();
    $scope.areNavHandlersLoadedFor = $mmCoursesDelegate.areNavHandlersLoadedFor;
    $scope.filter = {};
    $scope.get_html = function(x) {
  		return $sce.trustAsHtml(x);
  	}
  	$scope.hideAssign=function(element){
  		$scope.mdl_upcomingAssigns.splice(element, 1);
  	}
    $http({
	 	 	method: 'POST',
	 	 	url: 'https://www.cife.edu.mx/admin/application/Controllers/forumCtrl.php',
	 	 	data: {
	 	 		txt_funcion: "getPendingAssign",
        username:  $scope.siteinfo.username
	 	 	}
	 	 })
	 	 .success(function(data){
	 	 		 $scope.mdl_upcomingAssigns=data;
			/*********Pagination************/
			// $scope.pagination = Pagination.getNew(5);
			// $scope.pagination.numPages = Math.ceil($scope.mdl_upcomingAssigns.length/$scope.pagination.perPage);
			// console.log($scope.pagination.page)
			// console.log($scope.mdl_upcomingAssigns)
	 	 })
		  //getAssigments
		  $http({
	 	 		method: 'POST',
	 	 		url: 'https://www.cife.edu.mx/admin/application/Controllers/forumCtrl.php',
	 	 		data: {
	 	 		 txt_funcion: "Obtener_tareas_posts",
         username:  $scope.siteinfo.username
	 	 		}
	 	 	})
	 	 	.success(function(data){
			    console.log("hola")
	 	 		  $scope.mdl_assigns=data;
				  console.log(data)
				//$scope.mdl_assigns.created=timestamp = new Date($scope.mdl_assigns.created).getTime()
				//console.log($scope.mdl_assigns)
	 	 	})


    myCoursesObserver = $mmEvents.on(mmCoursesEventMyCoursesUpdated, function(siteid) {
        if (siteid == $mmSite.getId()) {
            fetchCourses();
        }
    });


    updateSiteObserver = $mmEvents.on(mmCoreEventSiteUpdated, function(siteId) {
        if ($mmSite.getId() === siteId) {
            $scope.searchEnabled = $mmCourses.isSearchCoursesAvailable() && !$mmCourses.isSearchCoursesDisabledInSite();
        }
    });

    $scope.$on('$destroy', function() {
        myCoursesObserver && myCoursesObserver.off && myCoursesObserver.off();
        updateSiteObserver && updateSiteObserver.off && updateSiteObserver.off();
    });
});

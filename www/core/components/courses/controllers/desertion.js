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
.controller('mmDesertionCtrl', function($scope, $mmCourses, $mmCoursesDelegate, $mmUtil, $mmEvents, $mmSite, $q,
            mmCoursesEventMyCoursesUpdated, mmCoursesEventMyCoursesRefreshed, mmCoreEventSiteUpdated,$http) {

    var updateSiteObserver,
        myCoursesObserver;
    $scope.message="miguel is here";
    $scope.searchEnabled = $mmCourses.isSearchCoursesAvailable() && !$mmCourses.isSearchCoursesDisabledInSite();
    $scope.areNavHandlersLoadedFor = $mmCoursesDelegate.areNavHandlersLoadedFor;
    $scope.filter = {};
    $http({
				method: 'POST',
				url: 'https://www.cife.edu.mx/admin/application/Controllers/admissionCtrl.php',
				data: {
					txt_funcion: "getEnrolledCourses",
          username:  $scope.siteinfo.username
				}
			})
			.success(function(data){
					$scope.courses=data;
					console.log($scope.courses)
			})
      $scope.desertion=function(baja){
				console.log("desertion"+baja)
				$http({
					method: 'POST',
					url: 'https://www.cife.edu.mx/admin/application/Controllers/admissionCtrl.php',
					data: {
						txt_funcion: "newDesertion",
						tipo_baja: baja.tipo_baja,
						idAcademic_details: baja.programa.idAcademic_details,
						razones: baja.razones,
						sugerencias: baja.sugerencias,
						compromiso: baja.compromiso,
            username:  $scope.siteinfo.username
					}
				})
				.success(function(data){
          alert("Sentimos tanto que te vayas, te esperamos de vuelta")
					$scope.baja.tipo_baja="";
					$scope.baja.programa="";
					$scope.baja.razones="";
					$scope.baja.sugerencias="";
					$scope.baja.compromiso="";
					$scope.courses.splice($scope.baja.programa, 1);


				})
			}


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

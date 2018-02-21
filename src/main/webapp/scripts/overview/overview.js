angular.module('app')
.controller('OverviewController',function($scope,$window,$http,$state){
    $state.go('performance');
    //styling//
	$('#tabs div:first-child').css('background-color','#EAEEE9');
    $('#tabs div:first-child').css('color','#107ABA');
    $('#tabs div:not(:nth-child(1))').css('background-color','#107ABA');
    $('#tabs div:not(:nth-child(1))').css('color','#EAEEE9');

    //functions
    //////
    $('#content').hide();

});
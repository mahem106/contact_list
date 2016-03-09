'use strict';

$(document).ready(function(){
    $('.modal-trigger1').leanModal();
    $('.modal-trigger2').leanModal();
    $('.modal-trigger3').leanModal();
    $('#cancel').closeModal();
  });

var snap = angular.module('snuffles', []);





  snap.controller('mainCtrl', function($scope, $http) {

    function getContacts() {
      $http({
        method: 'GET',
        url: '/list'
      })
      .then(function(res) {
        $scope.contacts = res.data;
      }, function(err) {
        console.error('error: ', err);
      })
    }

  getContacts();

    $scope.addContact = function() {
      $scope.contacts.push($scope.newContact);
      postContacts($scope.newContact);
      $scope.newContact = {};
    };

    $scope.delContact = function(contact) {
      var delIndex = this.$index;
      $http({
        method: 'DELETE',
        url: `/list/${delIndex}`,
      });
        $scope.contacts.splice(delIndex, 1);
    }


    function postContacts(data) {
      $http.post("/list", data).success(function(data, status) {
          console.log('posted');
      })
    };

    // $scope.editContact()

});

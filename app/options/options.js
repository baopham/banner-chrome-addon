(function () {
  'use strict';
  
  angular.module('options', []);
  
  angular.module('options')
    .constant('chrome', chrome);
  
  angular.module('options')
    .controller('OptionsController', OptionsController);
    
  OptionsController.$inject = ['chrome', '$scope', '$timeout'];
  function OptionsController(chrome, $scope, $timeout) {
    var vm = this;
    
    vm.projects = [
      {name: 'Default', domain: '*.dev', banner: 'Bao\'s ENV'}
    ];
    
    vm.status = null;
    vm.save = save;
    
    vm.add = add;
    vm.remove = remove;
    
    activate();
    
    function activate() {
      chrome.storage.sync.get({
        projects: vm.projects
      }, function(items) {
          vm.projects = items.projects;
          $scope.$digest();
      });
    }
    
    function save() {
      setdomainRegex();
      vm.status = 'Saving';
      chrome.storage.sync.set({
        projects: vm.projects
      }, function() {
        vm.status = 'Saved';
        $scope.$digest();
        $timeout(function () {
          vm.status = null;
        }, 3000);
      });
    }
    
    function setdomainRegex() {
      angular.forEach(vm.projects, function (project) {
        project.domainRegex = project.domain.replace(/\*/g, "[^ ]*")
                                            .replace('\.', '\\.');
      });
    }
    
    function add() {
      vm.projects.push({
        name: '',
        domain: '',
        banner: ''
      });
    }
    
    function remove(index) {
      vm.projects.splice(index, 1);
    }
  }
  
})();

angular.module('App').config(($stateProvider) => {
  $stateProvider.state('app.networks.cdn.dedicated.manage', {
    redirectTo: 'app.networks.cdn.dedicated.manage.statistics',
    translations: { value: ['.'], format: 'json' },
    views: {
      cdnMainView: {
        templateUrl: 'cdn/dedicated/manage/cdn-dedicated-manage.html',
        controller: 'CdnManageCtrl',
        controllerAs: '$ctrl',
      },
    },
  });
});

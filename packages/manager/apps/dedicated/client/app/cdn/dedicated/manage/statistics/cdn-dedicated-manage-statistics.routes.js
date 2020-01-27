angular.module('App').config(($stateProvider) => {
  $stateProvider.state('app.networks.cdn.dedicated.manage.statistics', {
    views: {
      cdnView: {
        templateUrl:
          'cdn/dedicated/manage/statistics/cdn-dedicated-manage-statistics.html',
        controller: 'CdnStatisticsCtrl',
      },
    },
    translations: { value: ['.'], format: 'json' },
  });
});

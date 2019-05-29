import map from 'lodash/map';
import find from 'lodash/find';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('pci.projects.project.failover-ips', {
      url: '/failover-ips',
      component: 'pciProjectFailoverIps',
      translations: {
        format: 'json',
        value: ['.'],
      },
      redirectTo: transition => transition
        .injector()
        .getAsync('failoverIps')
        .then(failoverIps => (failoverIps.length === 0 ? { state: 'pci.projects.project.failover-ips.onboarding' } : false)),
      resolve: {
        breadcrumb: /* @ngInject */ $translate => $translate
          .refresh()
          .then(() => $translate.instant('pci_projects_project_failoverip_title')),
        failoverIps: /* @ngInject */ (
          $q,
          OvhApiCloudProject,
          OvhApiCloudProjectIpFailover,
          projectId,
        ) => $q.all({
          failoverIps: OvhApiCloudProjectIpFailover
            .v6()
            .query({
              serviceName: projectId,
            })
            .$promise,
          instances: OvhApiCloudProject
            .Instance()
            .v6()
            .query({
              serviceName: projectId,
            })
            .$promise,
        }).then(({ failoverIps, instances }) => map(
          failoverIps,
          failoverIp => ({
            ...failoverIp,
            instance: failoverIp.routedTo ? find(instances, { id: failoverIp.routedTo }) : null,
          }),
        )),
      },
    });
};
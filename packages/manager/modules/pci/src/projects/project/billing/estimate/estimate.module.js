import angular from 'angular';
import '@uirouter/angularjs';
import 'ovh-api-services';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';

import legacy from './legacy/estimate.module';
import forecast from './forecast/forecast.module';
import routing from './estimate.routing';

const moduleName = 'ovhManagerPciProjectBillingEstimate';

angular
  .module(moduleName, [
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
    'ovh-api-services',
    'ui.router',
    forecast,
    legacy,
  ])
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

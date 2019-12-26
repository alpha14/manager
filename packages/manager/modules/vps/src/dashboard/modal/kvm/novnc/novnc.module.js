import 'angular-translate';
import 'ovh-ui-angular';

import component from './novnc.component';
import './index.less';

const moduleName = 'ovhManagerVpsKvmNovncModule';

angular
  .module(moduleName, ['oui', 'pascalprecht.translate'])
  .component('dedicatedVpsKvmNovnc', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

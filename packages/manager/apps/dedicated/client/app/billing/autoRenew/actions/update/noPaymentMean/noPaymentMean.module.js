import component from './noPaymentMean.component';

const moduleName = 'ovhManagerBillingAutorenewUpdateWithoutPaymentMean';

angular.module(moduleName, [
])
  .component('billingAutorenewUpdateWithoutPaymentMean', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

import controller from './create.controller';
import template from './create.html';

export default {
  bindings: {
    capabilities: '<',
    catalog: '<',
    defaultPaymentMethod: '<',
    goBackToList: '<',
    hasDefaultPaymentMethod: '<',
    hostCount: '<',
    paymentMethodURL: '<',
    regions: '<',
    user: '<',
  },
  controller,
  template,
};

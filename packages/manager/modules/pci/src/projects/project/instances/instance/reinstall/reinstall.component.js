import controller from './reinstall.controller';
import template from './reinstall.html';

export default {
  controller,
  template,
  bindings: {
    projectId: '<',
    instance: '<',
    goBack: '<',
  },
};

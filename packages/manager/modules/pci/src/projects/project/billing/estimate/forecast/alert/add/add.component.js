import controller from './add.controller';
import template from './add.html';

export default {
  bindings: {
    goBack: '<',
    projectId: '<',
    user: '<',
  },
  controller,
  template,
};

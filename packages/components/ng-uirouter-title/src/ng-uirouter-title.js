import angular from 'angular';

const moduleName = 'ngUirouterTitle';
angular
  .module(moduleName, [
    'ui.router',
    'ui.router.title',
  ])
  .run(/* ngInject */ ($transitions) => {
    $transitions.onSuccess({}, (transition) => {
      transition.promise.finally(() => {
        document.title = transition.injector().get('$title');
      });
    });
  });

export default moduleName;
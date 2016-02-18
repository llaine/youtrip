  /**
 * Cette fonction permet de gérer la redirection automatique, dès lors que l'utilisateur
 * n'est plus connecté.
 * Cette fonction va s'appeller toute seule, grâce à l'autorun.
 */
Tracker.autorun(function () {
  if(!Meteor.userId()) {
    FlowRouter.go(FlowRouter.path('homepage'))
  }
});
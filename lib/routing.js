// Creation d'un alias des fonctions importé depuis utils.
const renderTemplate = RoutingUtils.renderTemplate;
const generateRoute = RoutingUtils.generateRoute;
const generateRouteAdmin = RoutingUtils.generateRouteAdmin;

/**
 * Configuration du notFound
 * @type {{action: FlowRouter.notfound.action}}
 */
FlowRouter.notfound = {
  action: function() {
    renderTemplate('routeNotFound', 'routeNotFoundTpl')
  }
};

// Définitions des routes principales
// La fonction generateroute, prend deux paramètres.
// Le premier, correspond au nom de la route et le second au template qu'on veut render.
FlowRouter.route('/', generateRoute('homepage', 'homepageTpl'));

// Définitions des routes admin
// L'ensemble des routes,
const connectedRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter: [
    /**
     * Cette fonction est appelé dès lors qu'on veut accéder aux routes commencant par /admin
     * On vérifie donc que l'utilisateur est connecté.
     * Si, il nest pas connecté il est redirigé sur la page d'acceuil.
     * @param context
     * @param redirect
     */
    function(context, redirect) {
      if(!Meteor.userId()) {
        // Redirige automatiquement sur la page d'acceuil.
        redirect(FlowRouter.path('homepage'))
      }
    }
  ]
});

// Définitions des routes administrateur.
connectedRoutes.route('/', generateRouteAdmin('adminHomepageTpl'));
connectedRoutes.route('/create-post', generateRouteAdmin('articleCreateTpl'));



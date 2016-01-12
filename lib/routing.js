// Création d'un alias des fonctions de l'objet RoutingUtils.
// Pour que ça soit plus court à utiliser, et pour savoir d'où viennes ces fonctions.
const renderTemplate = RoutingUtils.renderTemplate;
const generateRoute = RoutingUtils.generateRoute;
const generateRouteUserConnected = RoutingUtils.generateRouteUserConnected;

// ==================== Définitions des routes principales ====================
// La fonction generateroute, prend deux paramètres.
// Le premier, correspond au nom de la route et le second au template qu'on veut render.
FlowRouter.route('/', generateRoute('homepage', 'homepageTpl'));



// ==================== Définitions des routes pour l'utilisateur connecté ====================
/**
 * On crée un groupe de route parente, desquels vont hériter des routes enfantes.
 * La définition de ces routes, sont plus bas.
 * Ca permet de factoriser le code et de créer un point d'entrée unique aux routes pour l'user connecté
 */
const connectedRoutes = FlowRouter.group({
  prefix: '/blog',
  name: 'blog',
  triggersEnter: [
    /**
     * Cette fonction est appelé dès lors qu'on veut accéder aux routes commencant par /blog
     * On vérifie donc que l'utilisateur est connecté.
     * Si, il nest pas connecté il est redirigé sur la page d'acceuil.
     * @param context
     * @param redirect
     */
    function(context, redirect) {
      if(!Meteor.userId()) {
        // Redirige automatiquement sur la page d'accueil.
        redirect(FlowRouter.path('homepage'))
      }
    }
  ]
});
// Les routes
connectedRoutes.route('/', generateRouteUserConnected('blogHomepageTpl'));
connectedRoutes.route('/post/new', generateRouteUserConnected('blogPostCreateTpl'));



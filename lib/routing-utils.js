/**
 * Ce fichier contient des fonctions d'aide au router.
 * Elles sont placés ici pour ne pas polluer le fichier routing.js
 */


/**
 * Fonction permettant d'afficher un template passé en paramètre.
 * Utilisé pour gérer le duo, une route correspondant à un template.
 * @param childTemplate
 */
const renderTemplate = (childTemplate) => {
  // Correspond au nom du template parent à tout les templates.
  // Celui-ci est définit dans client/app.html
  const mainTemplate = 'root';

  BlazeLayout.render(mainTemplate, { main: childTemplate });
};

/**
 * Fonction de helper, permettant d'afficher un console.info
 * A chaque fois qu'une route est visité ou quittée.
 * @param routeName
 */
const logOnEnterRoute = (routeName) => console.info(`Chargement de ${routeName.path}`);
const logOnLivingRoute = (routeName) => console.info(`Sortie de ${routeName.path}`);

/**
 * Permet de générér une route FlowRouter
 * Cette fonction est principalement là pour des raisons de factorisation.
 * On va pouvoir générer une route, simplement en appellant cette fonction au lieu
 * de dupliquer l'objet JSON.
 * Cette fonction est publique et est principalement utilisé dans le fichier lib/routing.js
 * On a également la possibilité d'override l'action, en passant un callback à la fonction
 * @param name
 * @param template
 * @param cb
 * @returns {{name: *, action: action, triggersEnter: *[], triggersExit: *[]}}
 */
const generateRoute = (name = null, template = null, cb = null) => {
  return {
    name: name,
    /**
     * Pour chaque route, une action va être effectuée
     * L'action par défaut est le renderTemplate ce qui correspond au rendering d'un template.
     * Dans chaque template, on peut accéder à deux variables, params, queryParams
     * @param params
     * @param queryParams
     */
    action:function(params, queryParams) {
      if(cb) {
        cb(name, template, {params, queryParams})
      } else {
        renderTemplate(template, { params, queryParams })
      }
    },
    // Tableau de fonctions appelés au moment au la route va être atteinte.
    triggersEnter:[logOnEnterRoute],
    // Tableau de fonctions appelés, au moment ou la route va être quitté.
    triggersExit:[logOnLivingRoute]
  }
};

// Export
RoutingUtils = {
  renderTemplate:renderTemplate,
  generateRoute:generateRoute
};
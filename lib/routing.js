/**
 * Fonction permettant d'afficher un template passé en paramètre.
 * Utilisé pour gérer le duo, une route correspondant à un template.
 * @param childTemplate
 */
const renderTemplate = (childTemplate) => {
  // Correspond au nom du template parent à tout les templates.
  const mainTemplate = 'root';

  BlazeLayout.render(mainTemplate, { main: childTemplate });

};

// Fonction d'helper pour afficher le nom des routes à chaque entrée/sortie
const logOnEnterRoute = (routeName) => console.info(`Chargement de ${routeName.path}`);
const logOnLivingRoute = (routeName) => console.info(`Sortie de ${routeName.path}`);

// Définitions des routes principales
FlowRouter.route('/', {
  name: 'homepage',
  /**
   * L'action pour la route /
   * Ici on va simplement render le layout de la page d'accueil.
   * @param params
   * @param queryParams
   */
  action: function(params, queryParams) {
    renderTemplate('homepage')
  },
  // Tableau de fonctions appelés au moment au la route va être atteinte.
  triggersEnter:[logOnEnterRoute],
  // Tableau de fonctions appelés, au moment ou la route va être quitté.
  triggersExit:[logOnLivingRoute]
});

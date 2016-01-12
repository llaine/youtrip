/**
 * Configuration du notFound
 * @type {{action: FlowRouter.notfound.action}}
 */
FlowRouter.notfound = {
  action: () => {
    RoutingUtils.renderTemplate('routeNotFound', 'routeNotFoundTpl')
  }
};

// Définitions des routes principales
// La fonction generateroute, prend deux paramètres.
// Le premier, correspond au nom de la route et le second au template qu'on veut render.
FlowRouter.route('/', RoutingUtils.generateRoute('homepage', 'homepageTpl'));




// Définitions des routes admin
const adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter: [function(context, redirect) {
    console.log('running group triggers');
  }]
})


/**
 * Configuration du notFound
 * @type {{action: FlowRouter.notfound.action}}
 */
FlowRouter.notfound = {
  action: () => {
    renderTemplate('routeNotFound', 'routeNotFoundTpl')
  }
};

const onPageLoginAction = (name, template, paramsObj) => {
  renderTemplate(template)
};

// Définitions des routes principales
// La fonction generateroute, prend deux paramètres.
// Le premier, correspond au nom de la route et le second au template qu'on veut render.
FlowRouter.route('/', generateRoute('homepage', 'homepageTpl'));
FlowRouter.route('/about', generateRoute('about', 'aboutTpl'));
FlowRouter.route('/login', generateRoute('login', 'loginTpl', onPageLoginAction));


Template.blogPostCreateTpl.helpers({
  'nameConverted': () => {
    if(Session.get('markerPosition')) {
      return Session.get('markerPosition').results[0].formatted_address;
    }
  }
});

Template.blogPostCreateTpl.events({
  /**
   * Lorsque le formulaire est submité en appuyant sur "valider".
   * On récupère la valeur des attributs du formulaire et on ajoute
   * à la fonction de suppression
   * TODO : Rajouter la gestion des erreurs
   * @param event
   */
  'submit form': (event) => {
    // Stop le submit du form.
    event.preventDefault();

    // On récupère le formulaire dans le DOM
    const form = $(event.currentTarget);

    // On récupère les valeurs des input du formulaire.
    const titleInput = form.find('[name="title"]');
    const bodyInput = form.find('[name="body"]');

    const title = titleInput.val();
    const body = bodyInput.val();

    // On apelle la fonction en back pour créer un post.
    Meteor.call('createUserPost',
      { title, body },
      (error, result) => {
        if(!error) {
          titleInput.value = '';
          bodyInput.value = '';

          FlowRouter.redirect('/blog');
        } else {
          console.log(error);
        }
      }
    );
  }
});
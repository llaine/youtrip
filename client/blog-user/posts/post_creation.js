Template.blogPostCreateTpl.events({
  'submit form': (event) => {
    // Stop l'envoie du form.
    event.preventDefault();
    // On récupère le formulaire dans le DOM
    const form = $(event.currentTarget);

    // On récupère les valeurs des input du formulaire.
    const titleInput = form.find('[name="title"]');
    const bodyInput = form.find('[name="body"]');

    const title = titleInput.val();
    const body = bodyInput.val();

    // On apelle la fonction en back pour créer un user.
    Meteor.call('createUserPost',
      { title, body },
      (error, result) => {
        if(!error) {
          FlowRouter.redirect('/blog');
        } else {
          console.log(error);
        }
      }
    );
  }
});
Template.blogPostUpdateTpl.rendered = function() {
  // On récupère le post qui va être modifi&
  const postId = FlowRouter.current().params.id;
  Meteor.subscribe('UserPost', postId);
};


Template.blogPostUpdateTpl.helpers({
  'article': () => UserPosts.find().fetch()[0] && UserPosts.find().fetch()[0]
});

Template.blogPostUpdateTpl.events({
  'submit form': (event) => {
    event.preventDefault();

    // On récupère le formulaire dans le DOM
    const form = $(event.currentTarget);

    // On récupère les valeurs des input du formulaire.
    const titleInput = form.find('[name="title"]');
    const bodyInput = form.find('[name="body"]');
    // Geoloc
    const lonInput = form.find('[name="lonNew"]');
    const latInput = form.find('[name="latNew"]');

    const title = titleInput.val();
    const body = bodyInput.val();
    // Geoloc
    const lon = lonInput.val();
    const lat = latInput.val();
    const _id = FlowRouter.current().params.id;

    Meteor.call('updateUserPost',
        //Geoloc
        { _id, title, body, lon, lat },
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
const marked = Meteor.npmRequire('marked');

Meteor.methods({
  createUserPost: function(postAttributes) {
    const post = {
      post_attributes: {
        title: postAttributes.title,
        // On transforme le body markdown en HTML à l'aide de la fonction marked
        body: marked(postAttributes.body),
        created_at: new Date().getTime()
      },
      user_id: Meteor.userId()
    };

    // On vérifie que le schéma, correspond bien à nos attentes.
    // Sinon on throw l'erreur, pour qu'elle remonte au client.
    // TODO, fixer l'ereur qui bloque la validation.
    try {
      UserPosts.schema.validate(post);
    } catch(e) {
      throw (e);
    }

    UserPosts.insert(post);

    return true;
  }
});
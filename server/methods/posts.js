const marked = Meteor.npmRequire('marked');

Meteor.methods({
  createUserPost: function(postAttributes) {
    const post = {
      post_attributes: {
        title: postAttributes.title,
        // On transforme le body markdown en HTML à l'aide de la fonction marked
        body: marked(postAttributes.body),
        body_markdown: postAttributes.body,
        created_at: new Date().getTime(),
        updated_at: null
      },
      is_draft:true, // Par défaut c'est un draft, donc il n'est pas encore publié aka visible sur le blog
      user_id: Meteor.userId()
    };

    // On vérifie que le schéma, correspond bien à nos attentes.
    // Sinon on throw l'erreur, pour qu'elle remonte au client.
    try {
      UserPosts.schema.validate(post);
    } catch(e) {
      throw (e);
    }

    UserPosts.insert(post);

    return true;
  },
  updateUserPost: function (postAttributes) {
    // On vérifie que les attributs sont bien présent
    check(postAttributes, {
      _id: String,
      title: String,
      body: String
    });

    // On mets à jour le document.
    UserPosts.update(
        _id,
        {
          $set: {
            title: postAttributes.title,
            body_markdown: postAttributes.body,
            body: marked(postAttributes.body),
            updated_at: new Date().getTime()
          }
        }
    );
  }
});
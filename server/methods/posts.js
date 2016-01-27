const marked = Meteor.npmRequire('marked');

// TODO ajouter les droits de modif/écriture pour le user.
Meteor.methods({
  /**
   * Créer un nouveau post pour l'utilisateur connecté
   * @param postAttributes
   * @returns {boolean}
   */
  createUserPost: function(postAttributes) {
    const post = {
      post_attributes: {
        title: postAttributes.title,
        // On transforme le body markdown en HTML à l'aide de la fonction marked
        body: marked(postAttributes.body),
        body_markdown: postAttributes.body,
        created_at: new Date(),
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
  },
  /**
   * Mets à jour le post pour un user connecté
   * @param postAttributes
   */
  updateUserPost: function (postAttributes) {
    // On vérifie que les attributs sont bien présent
    check(postAttributes, {
      _id: String,
      title: String,
      body: String,
      lon: String,
      lat: String
    });

    // On mets à jour le document.
    UserPosts.update(
        { _id:postAttributes._id },
        {
          $set: {
            'post_attributes.title': postAttributes.title,
            'post_attributes.body_markdown': postAttributes.body,
            'post_attributes.body': marked(postAttributes.body),
            'post_attributes.updated_at': new Date()
          }
        }
    );
  },
  /**
   * Supprime un post
   * @param postId
   */
  deleteUserPost: function (postId) {
    check(postId, String);

    UserPosts.remove(postId);
  }
});
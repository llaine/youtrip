Template.blogPostListComponentTpl.rendered = () => {
  Meteor.subscribe('UserPosts');
};


Template.blogPostListComponentTpl.helpers({
  /**
   * On récupère la liste des Posts
   * avec une requête dans la base de données
   * @returns {DOMElement|any|Cursor|*|{}|T}
   */
  'posts': () => UserPosts.find(),
  /**
   * On teste si les articles écrit sont vides.
   */
  'isPostsEmpty': () => UserPosts.find().fetch().length !== 0,
  /**
   * On converti la date de création en une date "lisible"
   * à l'aide de momentjs.
   * @returns {*}
   */
  'lisibleDate': function() {
    return new moment(new Date(this.post_attributes.created_at)).fromNow();
  }
});


Template.blogPostListComponentTpl.events({
  /**
   * Au clique sur le bouton d'update de l'article
   */
  'click [data-action=update]': function() {
    FlowRouter.go('/blog/post/update/:id', {id: this._id});
  },
  /**
   * Au clique sur le bouton de suppression de l'article
   * @param event
   */
  'click [data-action=delete]': function(event) {
    console.log(this)
  },
  /**
   * Au clique sur le bouton pour voir l'article
   * @param event
   */
  'click [data-action=see]': function(event) {
    console.log(this)
  }
});
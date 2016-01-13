// On récupère les posts du user connecté.
Meteor.publish('UserPosts', function() {
  if (this.userId) {
    return UserPosts.find({user_id: this.userId}, {sort: {created_at: -1}})
  }
});
Meteor.publish('UserPost', (_id) => UserPosts.find({_id:_id}));


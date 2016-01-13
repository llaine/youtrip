Template.blogPostListComponentTpl.rendered = () => {
  Meteor.subscribe('UserPosts');
};


Template.blogPostListComponentTpl.helpers({
  'posts': () => {
    return UserPosts.find();
  },
  'lisibleDate': () => {

  }
});
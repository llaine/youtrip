UserPosts = new Mongo.Collection('user-posts');

UserPosts.schema = new SimpleSchema({
  _id: { type: String },
  post_attributes: {
    type: Object,
    // Ne contient qu'un seul objet de ce type
    minCount: 1,
    maxCount: 1
  },
  // Attributes de l'object posts
  'post_attributes.$.title': { type : String },
  'post_attributes.$.body': { type : String },
  // TODO Pour plus tard : rajouter les comments
  'post_attributes.$.create_at': { type: Date },
  user_id: { type: Number }
});
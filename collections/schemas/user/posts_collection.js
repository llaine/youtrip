UserPosts = new Mongo.Collection('userPosts');

UserPosts.schema = new SimpleSchema({
  post_attributes: {
    type: Object,
    blackbox:true
  },
  // Attributes de l'object posts
  'post_attributes.$.title': { type : String },
  'post_attributes.$.body': { type : String },
  'post_attributes.$.body_markdown': { type : String },
  // TODO Pour plus tard : rajouter les comments
  'post_attributes.$.created_at': { type: Date },
  'post_attributes.$.updated_at': { type: Date },
  user_id: { type: String },
  'is_draft': { type: Boolean }
});

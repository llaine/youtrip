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
  'post_attributes.$.geoloc': { type: Object, blackbox:true },
  // La latitude longitude
  'post_attributes.$.geoloc.$.lat': { type: String, optional: true },
  'post_attributes.$.geoloc.$.lng': { type: String, optional: true },
  user_id: { type: String },
  'is_draft': { type: Boolean }
});


UserPosts.allow({
  /**
   *
   * @param userId
   * @param doc
   * @returns {boolean}
   */
  insert: function(userId, doc) {
    return true;
  },
  /**
   *
   * @param userId
   * @param doc
   * @param fieldNames
   * @param modifier
   * @returns {boolean}
   */
  update: function(userId, doc, fieldNames, modifier) {
    return true;
  },
  /**
   *
   * @param userId
   * @param doc
   * @returns {boolean}
   */
  remove: function(userId, doc) {
    return true;
  }
});
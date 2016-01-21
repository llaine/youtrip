

Meteor.Schema = Meteor.Schema || {};

Meteor.Schema.UserProfile = new SimpleSchema({
  firstName: {
    type: String,
    label: 'First Name'
  },
  lastName: {
    type: String,
    label: 'Last Name',
    optional: true
  }
}),

Meteor.user.schema = new SimpleSchema({
  _id: { type: String },
  emails: { type: Array },
  'emails.$': { type: Object },
  'emails.$.address': { type: String },
  'emails.$.verified': { type: Boolean },
  createdAt: { type: Date },
  services: { type: Object, blackbox: true },
  profile: { type: Meteor.Schema.UserProfile }
})

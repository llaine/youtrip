// Ensuring every user has an email address, should be in server-side code
Accounts.validateNewUser((user) => {
  // On valide le schéma à l'aide du validateur.
  Meteor.user.schema.validate(user);
  // Return true to allow user creation to proceed
  return true;
});
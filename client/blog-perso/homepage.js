/**
 * Created by youyou on 19/01/16.
 */

Template.persoBlogTpl.rendered = function() {
    const idUser = FlowRouter.current().params.idUser;
    console.log('ID User = ',idUser);
    return idUser;
};

Template.persoBlogTpl.helpers({

    'IdBlogPage': () => FlowRouter.current().params.idUser,

    'LastName': function() {
        var user = Meteor.users.findOne({_id: FlowRouter.current().params.idUser});
        return user.profile.lastName;
    },

    'FirstName': function() {
        var user = Meteor.users.findOne({_id: FlowRouter.current().params.idUser});
        return user.profile.firstName;
    }

});
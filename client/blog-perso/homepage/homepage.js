/**
 * Created by youyou on 19/01/16.
 */

Meteor.subscribe('images');


Template.persoBlogTpl.rendered = function() {

};

Template.persoBlogTpl.helpers({

    'profileCoverUrl': function() {
        var idProfileCover = Meteor.user().profile.profileCover;
        if(idProfileCover != null){
            return Images.findOne({_id: Meteor.user().profile.profileCover});
        } else {
            return null;
        }
    },

    'IdBlogPage': () => FlowRouter.current().params.idUser,

    'lastName': function() {
        var user = Meteor.users.findOne({_id: FlowRouter.current().params.idUser});
        return user.profile.lastName;
    },

    'firstName': function() {
        var user = Meteor.users.findOne({_id: FlowRouter.current().params.idUser});
        return user.profile.firstName;
    }

});
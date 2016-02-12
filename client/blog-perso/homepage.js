/**
 * Created by youyou on 19/01/16.
 */

Meteor.subscribe('images');


Template.persoBlogTpl.rendered = function() {

/*
    var user = Meteor.user();
    if( !user.profile.profileCover ) {
        $('.blog-intro-header').css("background-image", "url(../img/home-bg.jpg)");
        console.log('Aucune image définie. Affichage de l image par défaut');
    } else {
        var picture = Images.findOne({_id: user.profile.profileCover});
        console.log(picture.url);
        console.log('Image affichée: '+ user.profile.profileCover);
        $('.blog-intro-header').css("background-image", "url(" + picture.url + ")");
    }
 */
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
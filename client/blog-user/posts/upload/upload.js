/**
 * Created by youyou on 09/02/16.
 */

Meteor.subscribe('images');

Template.uploadMainPhotoComponentTpl.helpers({

    'profileCoverImg': function() {
        var idProfileCover = Meteor.user().profile.profileCover;
        if(idProfileCover){
            return Images.findOne({_id: Meteor.user().profile.profileCover});
        } else {
            return null;
        }
    },

    'images': function() {
        return Images.find();
    }
});
Template.uploadMainPhotoComponentTpl.events({
    'change .fileInput': function(event){

        var file = event.target.files[0];

        Images.insert(file, function (err, fileObj) {
            if(err) console.log(err);
            else {

                var user = Meteor.user();
                Meteor.users.update(user._id, {$set: {profile: {
                    firstName: user.profile.firstName,
                    lastName: user.profile.lastName,
                    profileCover: fileObj._id
                }}});
                console.log('Perso image updated');
            };
        });
    },
});
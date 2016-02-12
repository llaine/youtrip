/**
 * Created by youyou on 10/02/16.
 */

Meteor.publish("images", function(){ return Images.find(); });
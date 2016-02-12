/**
 * Created by julie on 03/02/16.
 */


/**
 * methode qui définit le smtp du serveur ainsi que l'adresse receveur et émetteur.
 */
Meteor.startup(function(){

    process.env.MAIL_URL ='smtp://youtrip.contact@gmail.com:youtripM2@smtp.gmail.com:587/'

});
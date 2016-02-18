/**
 * Created by youyou on 12/02/16.
 */
Template.galleriesTpl.rendered = function () {
  Session.set('markersForFeed', []);
};

Template.galleriesTpl.helpers({

    'postsList' : function(){
      const markers = [];
      const MapFactory = CurrentMap || {};
        //On récupère les posts relatifs à l'ID de l'utilisateur défini dans l'URL de la page.
        const posts = UserPosts.find({ user_id : FlowRouter.current().params.idUser });
        //On créer un tableau vide dans lequel on mettra pour chaque post les photos correspondantes.
        var result = [];
        //Pour chaque posts, on récupère la chaine de caractère correspondante à l'ID de la photo, on récupère l'image en base de donnée puis on ajoute dans le tableau à renvoyer à la vue.
        posts.forEach(function(post){

          // On ajoute les markers dans une session.
            markers.push(post.post_attributes.geoloc);

            var arrayImages = [];
            post.post_attributes.arrayIdImg.forEach(function(obj){
                arrayImages.push(Images.findOne({ _id : obj.id }));
            });
            result.push(
                {
                    geoloc: post.post_attributes.geoloc,
                    title: post.post_attributes.title,
                    body: post.post_attributes.body,
                    images: arrayImages
                }
            );
        });

      Session.set('markersForFeed', markers);

      return result;
    },
});

Template.galleriesTpl.destroyed = () => delete Session.keys['markersForFeed'];
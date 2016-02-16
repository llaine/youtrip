Template.blogPostListComponentTpl.rendered = () => {
  Meteor.subscribe('UserPosts');


  /**
   * Positionner les posts
   * // Geoloc
   */
  function localisePosts() {
    var locations = [
      ['Position 1',  44.484746, -1.089696, 4],
      ['Position 2',  45.708859, -0.594461, 5],
      ['Position 3',  44.823146, -0.439248, 3],
      ['Position 4',  44.006679, 0.183252, 2],
      ['Position 5',  45.186545, 0.132758, 1]
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: new google.maps.LatLng(45.00, -0.50),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  }
  localisePosts();

};



/**
 * Est déclanché à l'appel de la page
 * // Geoloc
 */
Template.blogPostCreateTpl.rendered = () => {
  /**
   * Localise le post
   * // Geoloc
   */
  function localiseMe () {
    console.log('Localisation en cours...');
    var output = document.getElementById("out");
    var lon = document.getElementById("lon");
    var lat = document.getElementById("lat");

    if (!navigator.geolocation){
      console.log('Localisation indisponible');
      output.innerHTML = 'Geolocation non supportée.';
      return;
    }

    function success(position) {
      console.log('Localisation success');
      var latitude  = position.coords.latitude + randomise();
      var longitude = position.coords.longitude + randomise();

      output.innerHTML = 'Votre position est la suivante :';
      lon.value = longitude ;
      lat.value = latitude ;

      console.log('Localisation img');
      var img = new Image();
      img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=120x120&sensor=false";

      output.appendChild(img);
    };

    function error() {
      console.log('Localisation erreur');
      output.innerHTML = "Nous n'arrivons pas à vous localiser.";
    };

    /**
     * Retourne un nombre aleatoire pour le fun
     * @returns {number}
     */
    function randomise() {
      var sign = Math.random() < 0.5 ? -1 : 1;
      var number = Math.random();
      return sign * number;
    };

    output.innerHTML = '<p>Géolocalisation…</p>';

    navigator.geolocation.getCurrentPosition(success, error);
  }
  localiseMe();
};







Template.blogPostListComponentTpl.helpers({
  /**
   * On récupère la liste des Posts
   * avec une requête dans la base de données
   * @returns {DOMElement|any|Cursor|*|{}|T}
   */
  'posts': () => UserPosts.find(),
  /**
   * On teste si les articles écrit sont vides.
   */
  'isPostsEmpty': () => UserPosts.find().fetch().length !== 0,
  /**
   * On converti la date de création en une date "lisible"
   * à l'aide de momentjs.
   * @returns {*}
   */
  'lisibleDate': function() {
    return new moment(new Date(this.post_attributes.created_at)).fromNow();
  },
  /**
   * Retourne la date de modification, si elle est présente.
   * @returns {string}
   */
  'lisibleDateModif': function() {
    return this.post_attributes.updated_at === null ? 'Pas de modification pour le moment' :
        new moment(new Date(this.post_attributes.updated_at)).fromNow();
  }
});


Template.blogPostListComponentTpl.events({
  /**
   * Au clique sur le bouton d'update de l'article
   */
  'click [data-action=update]': function() {
    FlowRouter.go('/blog/post/update/:id', {id: this._id});
  },
  /**
   * Au clique sur le bouton de suppression de l'article
   * @param event
   */
  'click [data-action=delete]': function(event) {
    if(confirm('Êtes vous sur de vouloir supprimer cet article ?')) {
      Meteor.call('deleteUserPost', this._id, (err, result) => {
        if(err) { console.log(error) }
      });
    }
  },
  /**
   * Au clique sur le bouton pour voir l'article
   * @param event
   */
  'click [data-action=see]': function(event) {
    console.log(this)
  }
});
Template.blogPostCreateTpl.events({
  /**
   * Lorsque le formulaire est submité en appuyant sur "valider".
   * On récupère la valeur des attributs du formulaire et on ajoute
   * à la fonction de suppression
   * TODO : Rajouter la gestion des erreurs
   * @param event
   */
  'submit form': (event) => {
    // Stop le submit du form.
    event.preventDefault();

    // On récupère le formulaire dans le DOM
    const form = $(event.currentTarget);

    // On récupère les valeurs des input du formulaire.
    const titleInput = form.find('[name="title"]');
    const bodyInput = form.find('[name="body"]');
    const lonInput = form.find('[name="lon"]');
    const latInput = form.find('[name="lat"]');

    const title = titleInput.val();
    const body = bodyInput.val();
    const lon = lonInput.val();
    const lat = latInput.val();

    // On apelle la fonction en back pour créer un post.
    Meteor.call('createUserPost',
      { title, body, lon, lat },
      (error, result) => {
        if(!error) {
          titleInput.value = '';
          bodyInput.value = '';

          FlowRouter.redirect('/blog');
        } else {
          console.log(error);
        }
      }
    );
  }

});


Template.blogPostCreateTpl.rendered = () => {
  /**
   * Localise le post
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


Template.blogPostCreateTpl.rendered = () => {
  if(Session.get('uploadImgIdTmp') == null){
    Session.set('uploadImgIdTmp', []);
  }
};

Template.blogPostCreateTpl.helpers({
  'uploadImgTmp': function(){
    var result = [];
    var uploadImgIdTmp = Session.get('uploadImgIdTmp');
    uploadImgIdTmp.forEach(function(obj){
      var img = Images.findOne({_id: obj.id});
      result.push(img);
    });
    return result;
  },

  'nameConverted': () => {
    if(Session.get('markerPosition')) {
      return Session.get('markerPosition').address;
    }
  }
});

Template.blogPostCreateTpl.events({

  'change .fileInput': function(event){
    var file = event.target.files[0];
    Images.insert(file, function (err, fileObj) {
      if(err) console.log(err);
      else {
        var array = Session.get('uploadImgIdTmp');
        array.push({ id: fileObj._id});
        Session.set('uploadImgIdTmp',array);
      };
    });
  },

  'click .delete-img': function(event) {
    var idImg = this._id;
    var uploadImgIdTmp = Session.get('uploadImgIdTmp');

    var result = [];
    uploadImgIdTmp.forEach(function(obj){
      console.log(obj.id + ' : ' + idImg);
      if(!(obj.id === idImg)){
        result.push(obj);
      }
    })

    console.log(result);
    Session.set('uploadImgIdTmp', result);
    Images.remove(idImg);
  },

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

    const title = titleInput.val();
    const body = bodyInput.val();
    const position = Session.get('markerPosition').position;

    const arrayIdImg = Session.get('uploadImgIdTmp');



    // On apelle la fonction en back pour créer un post.
    Meteor.call('createUserPost',
        { title, body, arrayIdImg, position },
      (error, result) => {
        if(!error) {
          titleInput.value = '';
          bodyInput.value = '';
          Session.set('uploadImgIdTmp',[]);

          FlowRouter.redirect('/blog');
        } else {
          console.log(error);
        }
      }
    );
  }
});
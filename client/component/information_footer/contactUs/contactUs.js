/**
 * Created by julie on 03/02/16.
 */



Template.contactUsTpl.events({


    'submit form': (event) => {
        // Stop le submit du form.
        event.preventDefault();

        // On récupère le formulaire dans le DOM
        const form = $(event.currentTarget);

        // On récupère les valeurs des input du formulaire.


        const titleInput = form.find('[name="title"]');
        const bodyInput = form.find('[name="body"]');
        const emailInput = form.find('[name="email"]');



            const title = '[Contactez-nous: message utilisateur] ' + titleInput.val();
            const body = bodyInput.val() + ' message from: '+  emailInput.val();

            Meteor.call('sendEmail', title, body);
            FlowRouter.redirect('/');

    }

})


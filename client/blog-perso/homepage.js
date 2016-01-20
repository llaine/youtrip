/**
 * Created by youyou on 19/01/16.
 */

Template.persoBlogTpl.rendered = function() {
    const idUser = FlowRouter.current().params.idUser;
    console.log('ID User = ',idUser);
    return idUser;
};

Template.persoBlogTpl.helpers({
    'IdBlogPage': () => FlowRouter.current().params.idUser,

});
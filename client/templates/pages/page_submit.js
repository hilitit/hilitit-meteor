
Template.pageSubmit.onCreated(function() {
  Session.set('pageSubmitErrors', {});
});

Template.pageSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('pageSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('pageSubmitErrors')[field] ? 'has-error' : '';
  }
});



Template.pageSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var page = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    var errors = validatePage(page);
    if (errors.title || errors.url)
      return Session.set('pageSubmitErrors', errors);

    Meteor.call('pageInsert', page, function(error, result) {
      // display the error to the user and abort
      if (error){
        return throwError(error.reason);
      }

      // show this result but route anyway
      if (result.pageExists)
        throwError('This link has already been posted');

      Router.go('pagePage', {_id: result._id});
    });
  }
});




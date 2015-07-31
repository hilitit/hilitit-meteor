Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  /*waitOn: function() { 
    return [Meteor.subscribe('notifications')]
  }*/
});



PagesListController = RouteController.extend({
  template: 'pagesList',
  increment: 5, 
  pagesLimit: function() { 
    return parseInt(this.params.pagesLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.pagesLimit()};
  },
  subscriptions: function() {
    this.pagesSub = Meteor.subscribe('pages', this.findOptions());
  },
  pages: function() {
    return Pages.find({}, this.findOptions());
  },
  data: function() {
    var self = this;
    return {
      pages: self.pages(),
      ready: self.pagesSub.ready,
      nextPath: function() {
        if (self.pages().count() === self.pagesLimit())
          return self.nextPath();
      }
    };
  }
});



NewPagesController = PagesListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newPages.path({pagesLimit: this.pagesLimit() + this.increment})
  }
});



BestPagesController = PagesListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestPages.path({pagesLimit: this.pagesLimit() + this.increment})
  }
});




Router.route('/', {
  name: 'home',
  controller: NewPagesController
});



Router.route('/new/:pagesLimit?', {name: 'newPages'});

Router.route('/best/:pagesLimit?', {name: 'bestPages'});


Router.route('/pages/:_id', {
  name: 'pagePage',
  waitOn: function() {
    return [
      Meteor.subscribe('singlepage', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function() { return Pages.findOne(this.params._id); }
});

Router.route('/pages/:_id/edit', {
  name: 'pageEdit',
  waitOn: function() { 
    return Meteor.subscribe('singlepage', this.params._id);
  },
  data: function() { return Pages.findOne(this.params._id); }
});

Router.route('/submit', {name: 'pageSubmit'})

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'pagePage'});
Router.onBeforeAction(requireLogin, {only: 'pageSubmit'});

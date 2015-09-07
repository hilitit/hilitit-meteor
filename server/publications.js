
Meteor.publish('pages', function(options) {
  console.log(options);
  check(options, {
    sort: Object,
    limit: Number
  });
  return Highlights.find({}, options);
});

Meteor.publish('singlePage', function(id) {
  check(id, String);
  return Highlights.find(id);
});

/*
Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});
*/

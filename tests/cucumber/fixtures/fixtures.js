Meteor.methods({
  'reset': function () {
    Highlights.remove({});
  },
  'highlight/create': function (page) {
    Highlights.insert(page);
  }
});

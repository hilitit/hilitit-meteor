// Fixture data
//console.log (Pages.find() );
if (!Pages.find() || Pages.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var tomId = Meteor.users.insert({
    profile: { name: 'Tom Coleman' }
  });
  var tom = Meteor.users.findOne(tomId);

  var sachaId = Meteor.users.insert({
    profile: { name: 'Sacha Greif' }
  });
  var sacha = Meteor.users.findOne(sachaId);

  var page1Id = Pages.insert({
    url: 'http://www.aljazeera.com/news/2015/07/turkey-erdogan-warns-kurdish-fighters-150728130110904.html',
    createdAt: new Date(now - 7 * 3600 * 1000)
  });

  var page2Id = Pages.insert({
    url: 'http://www.aljazeera.com/news/2015/07/obama-chides-african-leaders-cling-power-au-addis-ababa-150728104939849.html',
    createdAt: new Date(now - 7 * 3600 * 1000)
  });


  Highlights.insert({
    pageId: page1Id,
    userId: tomId,
    createdAt: new Date(now - 5 * 3600 * 1000),
    text: 'impossible to continue a peace process with Kurdish fighters'
  });

  Highlights.insert({
    pageId: page1Id,
    userId: tomId,
    createdAt: new Date(now - 5 * 3600 * 1000),
    text: 'Turkey last week started military operations'
  });

  Highlights.insert({
    pageId: page1Id,
    userId: sachaId,
    createdAt: new Date(now - 5 * 3600 * 1000),
    text: 'impossible to continue a peace process with Kurdish fighters'
  });

  Highlights.insert({
    pageId: page1Id,
    userId: sachaId,
    createdAt: new Date(now - 5 * 3600 * 1000),
    text: 'SIL that killed 32 mostly young Kurdish students last week'
  });


  Highlights.insert({
    pageId: page2Id,
    userId: tomId,
    createdAt: new Date(now - 5 * 3600 * 1000),
    text: 'Obama has chided African leaders'
  });

  Highlights.insert({
    pageId: page2Id,
    userId: tomId,
    createdAt: new Date(now - 5 * 3600 * 1000),
    text: 'scolding came in the course of his address'
  });

  Highlights.insert({
    pageId: page2Id,
    userId: sachaId,
    createdAt: new Date(now - 5 * 3600 * 1000),
    text: 'Obama has chided African leaders who refuse to give up power in the first speech at the African',
  });

  Highlights.insert({
    pageId: page2Id,
    userId: sachaId,
    createdAt: new Date(now - 5 * 3600 * 1000),
    text: 'I have to be honest with you: I just don\'t understand this'
  });

}

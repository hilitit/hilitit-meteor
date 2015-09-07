
Highlights = new Mongo.Collection("highlights");


Highlights.allow({
  'insert': function (userId,doc) {
    /* user and doc checks ,
     *       return true to allow insert */
    console.error("invalid-method");
    throw new Meteor.Error('invalid-method', "Please use method  'pageInsert'");
    return false;
  }
});



validatePage = function (post) {
  var errors = {};

  if (!post.selector)
    errors.selector = "Please fill in a selector";

  if (!post.text)
    errors.texts =  "Please fill in a text";

  if (!post.host)
    errors.href =  "Please fill in a host";

  if (!post.port)
    errors.href =  "Please fill in a port";

  if (!post.path)
    errors.href =  "Please fill in a path";

  if (!post.protocol)
    errors.href =  "Please fill in a protocol";

  if (!post.startOffset)
      errors.startOffset =  "Please fill in a startOffset";

  if (!post.endOffset)
    errors.endOffset =  "Please fill in a endOffset";

  return errors;
}


Meteor.methods({
    highlight: function(postAttributes) {
      console.log("asdfasdfasdf");
      console.error(Meteor.user);
/*
      check(this.userId, String);

      check(postAttributes, {
        "selector": String,
        "text":  String,
        "host": String,
        "port": Match.Integer,
        "path": String,
        "protocol": String,
        "startOffset": Match.Integer,
        "endOffset": Match.Integer
      });

      var errors = validatePage(postAttributes);
       if (errors.selector || errors.text ){
         throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
       }

      var postWithSameLink = Highlights.findOne({
        selector: postAttributes.selector,
        text: postAttributes.text,
        href: postAttributes.href
      });

      if (postWithSameLink) {
        return {
          postExists: true,
          _id: postWithSameLink._id
        }
      }
*/
      var user = Meteor.user();

      var post = _.extend(postAttributes, {
        userId: user._id,
        author: user.username,
        submitted: new Date(),
        commentsCount: 0,
        upvoters: [],
        votes: 0
      });
      console.log("post: " + post);
      console.log( post);
      var postId = Highlights.insert(post);
      console.log("postId: " + postId);

      return {
        _id: postId
      };

    }
})

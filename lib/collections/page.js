
Pages = new Mongo.Collection("pages");


Pages.allow({
  'insert': function (userId,doc) {
    /* user and doc checks ,
     *       return true to allow insert */
    throw new Meteor.Error('invalid-method', "Please use method  'pageInsert'");
    return false;
  }
});



validatePage = function (post) {
  var errors = {};

  if (!post.selector)
    errors.selector = "Please fill in a selector";

  if (!post.text)
    errors.text =  "Please fill in a text";

  if (!post.href)
    errors.href =  "Please fill in a hrefs";

  if (!post.startOffset)
      errors.startOffset =  "Please fill in a startOffset";

  if (!post.endOffset)
    errors.endOffset =  "Please fill in a endOffset";


  return errors;
}


Meteor.methods({
    pageInsert: function(postAttributes) {


      check(this.userId, String);

      check(postAttributes, {
        // title: String,
        // "url": String,
        "selector": String,
        "text":  String,
        "href": String,
        "startOffset": Match.Integer,
        "endOffset": Match.Integer
      });

      var errors = validatePage(postAttributes);
       if (errors.selector || errors.text || errors.href){
         throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
       }

      var postWithSameLink = Pages.findOne({
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
      var user = Meteor.user();
      var post = _.extend(postAttributes, {
        userId: user._id,
        author: user.username,
        submitted: new Date(),
        commentsCount: 0,
        upvoters: [],
        votes: 0
      });

      var postId = Pages.insert(post);

      return {
        _id: postId
      };

    }
})


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

  if (!post.title)
    errors.title = "Please fill in a headline";

  if (!post.url)
    errors.url =  "Please fill in a URL";

  return errors;
}


Meteor.methods({
    pageInsert: function(postAttributes) {

      check(this.userId, String);
      check(postAttributes, {
        title: String,
        url: String
      });

      var errors = validatePage(postAttributes);
      if (errors.title || errors.url){
        throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
      }

      var postWithSameLink = Pages.findOne({url: postAttributes.url});
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



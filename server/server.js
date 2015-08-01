if (Meteor.isServer) {
    Meteor.startup(function () {
        // detect environment by getting the root url of the application
        console.log(JSON.stringify(process.env.ROOT_URL));

        // or by getting the port
        console.log(JSON.stringify(process.env.PORT));

        // alternatively, we can inspect the entire process environment
        //console.log(JSON.stringify(process.env));

 
      Accounts.loginServiceConfiguration.remove({
        service : 'twitter'
      });
 
      Accounts.loginServiceConfiguration.insert({
        service     : 'twitter',
        consumerKey : process.env.TWITTER_API_KEY ,
        secret      : process.env.TWITTER_API_SECRET
      });
 
    });

}

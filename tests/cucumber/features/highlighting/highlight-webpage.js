module.exports = function () {

  this.Given(/^a user created a Highlight post$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    h = {
      selector: "BODY . H1 ",
      text: "some text" ,
      href: "/index.html?id=12345" ,
      port: 80 ,
      path: "/hi" ,
      protocol: "http" ,
      startOffset: 100 ,
      endOffset: 200
    }
    return this.server.call('highlight/create', h);

  });



  this.When(/^a user navigates to the highlights list page$/, function(callback){
    return this.client.url(process.env.ROOT_URL+"/highlights/list");
  });

  this.Then(/^a user can list his highlights$/, function(callback){
  return this.client.
    waitForExist('h1').
    getText('h1').should.become("heading");
  });


}

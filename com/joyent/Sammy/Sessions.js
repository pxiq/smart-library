system.use("com.joyent.Resource");
var Session = new Resource('session');
Session.isTransient = true;

before( function() {
  var session_id = this.request.cookies['session'];
  if ( !session_id ) {
    this.session = new Session();
    this.session.save();
  } else {
    this.session = Session.get( session_id );
    if (!this.session) {
      this.session = new Session();
    }
  }
  this.response.headers["Set-Cookie"] = ['session', this.session.id].join('=');
});

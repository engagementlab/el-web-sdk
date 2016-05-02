beforeEach(function(done) {

    require('../app')().launch(function() {
        done();
    });

});
var boot,
    superagent = require('superagent'),
    expect = require('expect.js');

describe('server', function() {
    before(function(done) {

        require('../app')().launch(function() {
            done();
        });

    });
    describe('all routes', function() {
        it('should respond to GET with 200', function(done) {
            
            superagent
                .get('http://localhost:3000')
                .end(function(err, res) {
                    expect(res.status).to.equal(200);
                    done()
                });
            
            superagent
                .get('http://localhost:3000/unlockinghealth')
                .end(function(err, res) {
                    expect(res.status).to.equal(200);
                });
            
            superagent
                .get('http://localhost:3000/riskhorizon')
                .end(function(err, res) {
                    expect(res.status).to.equal(200);
                });

            superagent
                .get('http://localhost:3000/about')
                .end(function(err, res) {
                    expect(res.status).to.equal(200);
                });
            
            superagent
                .get('http://localhost:3000/jobs')
                .end(function(err, res) {
                    expect(res.status).to.equal(200);
                });
            
            superagent
                .get('http://localhost:3000/people')
                .end(function(err, res) {
                    expect(res.status).to.equal(200);
                });
            
            superagent
                .get('http://localhost:3000/publications')
                .end(function(err, res) {
                    expect(res.status).to.equal(200);
                });
            
            superagent
                .get('http://localhost:3000/cmap')
                .end(function(err, res) {
                    expect(res.status).to.equal(200);
                });
            
            superagent
                .get('http://localhost:3000/news')
                .end(function(err, res) {
                    expect(res.status).to.equal(200);
                });
            
            superagent
                .get('http://localhost:3000/press')
                .end(function(err, res) {
                    expect(res.status).to.equal(200);
                });
            
            superagent
                .get('http://localhost:3000/projects')
                .end(function(err, res) {
                    expect(res.status).to.equal(200);
                });

        })
    });
    // after(function () {
    //   shutdown();
    // });
});
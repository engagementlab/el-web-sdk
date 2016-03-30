/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// TODO: Clickjacking protection
/*keystone.pre('routes', function(req, res, next) {

    // Allow certain domains to frame site
    res.setHeader('X-Frame-Options', 'ALLOW-FROM www.riskhorizon.org');

    next();
})*/

// Import Route Controllers
var routes = {
    api: importRoutes('./api'),
    views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {

    // Views
    app.get('/', routes.views.index);

    app.get('/unlockinghealth', routes.views.html.unlockinghealth);
    app.get('/riskhorizon', routes.views.html.riskhorizon);

    app.get('/about', routes.views.about);
    app.get('/jobs', routes.views.job);
    app.get('/people', routes.views.people);
    app.get('/people/:person', routes.views.person);

    // app.get('/academics', routes.views.academics);

    app.get('/publications', routes.views.projects.publications);
    app.get('/publications/:publication_key', routes.views.projects.publication);
    app.get('/projects/:subdirectory/:project_key', routes.views.projects.project);

    app.get('/cmap', routes.views.cmap);
    app.get('/programs/cmap', routes.views.cmap);

    app.get('/news', routes.views.news);
    app.get('/press', routes.views.press);

    app.all('/tamagagement', routes.views.tamagagement);

    // CommunityPlanIt masked page (boston.communityplanit.org)
    app.all('/climatesmartboston', routes.views.communityplanit);
    app.all('/api/cpi/register', keystone.middleware.api, routes.api.communityplanit.create);
    
    // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
    // app.get('/protected', middleware.requireUser, routes.views.protected);

    // Redirect projects to /all
    app.get('/projects/', function(req, res, next) {
        res.redirect('/projects/all');
    });

    // Dynamic directory routes
    app.get('/:directory', routes.views.directory);
    app.get('/:directory/:subdirectory', routes.views.subdirectory);
};

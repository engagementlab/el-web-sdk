/**
 * Engagement Lab Bot
 * Developed by Engagement Lab, 2016
 * ==============
 * Device inventory page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class inventory
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var Device = keystone.list('Device');
var _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'inventory';

    view.on('init', function(next) {

        var queryDevices = Device.model.findOne({}, {}, {
            sort: {
                'createdAt': -1
            }
        });

        queryDevice.exec(function(err, resultDevice) {

            locals.devices = resultDevice;

        });
    });

    // Render the view
    view.render('devices/inventory');

};

/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2016
 * ==============
 * 'Unlocking Health' static site view.
 *
 * @module html
 * @author Johnny Richardson
 *
 * ==========
 */
var path = require('path');

exports = module.exports = function(req, res) {

    // Render the view
    res.sendFile('templates/html/unlockinghealth.html', {root: path.join(__dirname, '../../../') });

};

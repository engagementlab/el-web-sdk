/**
 * Engagement Lab Website
 * 
 * Slack plugin for posting CMS changes to specified channel
 * @author Johnny Richardson
 *
 * ==========
 */

var _keystone = require('keystone');
var _slackApiInst

var KeystoneSlacker = (function(slack) { 

    _slackApiInst = slack;

    Post: function(model, document, accolade, custom_name, channel) {

        // Do nothing if document not new/modified
        if(!(document.wasNew || document.wasModified))
            return;

        // Production-level apps only
        if (process.env.NODE_ENV !== 'production')
            return;

        if(model === undefined)
            throw "Slack plugin: A model must be defined!";
        else if(document === undefined)
            throw "Slack plugin: A document reference must be defined!";
        else if(document.updatedBy === undefined)
            throw "Slack plugin: document.updatedBy not present; ensure 'track' option is enabled on the model caller.";
        else if(custom_name !== undefined && typeof custom_name !== 'function')
            throw "Slack plugin: custom_name must be a function!";

        var slack = _slackApiInst;
        var _ = require('underscore');
        var Sentencer = require('sentencer');
        var modelName =  model.modelName || document.constructor.modelName;

        // TODO: Pull from config
        var affirmatives = [
                            'certainly', 'absolutely', 'positively', 'most definitely',
                            'confidently', 'definitely', 'emphatically', 'categorically', 'with certainty', 'conclusively', 
                            'unquestionably', 'undoubtedly', 'indisputably', 'unmistakably', 'assuredly'
                           ];
        var accoladeInd = Math.floor(Math.random() * affirmatives.length);

        _keystone.list('User').model.findById(document.updatedBy, function(err, user) {

            slack.api('users.list', function(err, response) {

                // If there was a slack error, just return so the doc is saved
                if(err)
                    return;

                if(response.ok) {
                    
                    // Get slack username given the keystone  user email
                    var slackUser = _.filter(response.members, function(member) {
                                        return _.some(member, {email: user.email});
                                    })[0];
                    var userName;
                    var documentName;

                    // If no slack user, just use person's name
                    if(slackUser === undefined) {
                        console.log("Slack user not found! Using keystone username.");
                        userName = user.name.first + ' ' + user.name.last;
                    }
                    else
                        userName = '<@' + slackUser.name + '>';

                    if(custom_name !== undefined)
                        documentName = custom_name();
                    else
                        documentName = document.name;

                    var slackMsg = userName + (document.wasNew ? ' created' : ' updated') + ' the ' + modelName + ' "' + documentName + '"!';

                    // Generate a random accolade?
                    if(accolade !== undefined && accolade !== false)
                        slackMsg += ' ' + Sentencer.make(userName + ' is ' + affirmatives[accoladeInd] + ' {{ an_adjective }} {{ noun }}!');

                    // Send slack message
                    slack.webhook({

                          channel: channel || slack.channel,
                          username: slack.user,  
                          icon_emoji: slack.user_icon,
                          text: slackMsg
                        },

                        function(err, response) {
                            if(err !== undefined)
                                console.error(err);
                        }

                    );
                }
            

            });

        });
    }

});

module.exports = KeystoneSlacker;
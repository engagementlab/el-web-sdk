
var _keystone = require('keystone');

// moods:
// sleeping, normal, bored, dead, happy, heartbroken, sad

module.exports = {
	moods: {
		normal: {
			messages: [
				'Errol is feeling pretty normal today!',
				'Look at this freakin ghost! Have you ever seen a more content otherworldly spirit?',
				'Errol\'s like, "sometimes you just gotta chill haha."'
			],
			actions: [ 'tickle', 'punch', 'insult' ]
		},
		sleeping: {
			message: [
				'SHHH!!! Errol\'s sleeping. Keep it down silly ;)',
				'Do ghosts dream? Errol\'s investigating!',
				'Nope - that\'s not sleep apnea. This ghost just had a real busy day!'
			],
			actions: [ 'wake' ]
		}
	},
	mood: 'normal',

	setMood: function(mood) {
		this.mood = mood;
	},

	getMood: function() {
		
		var key = '';

		var hour = new Date().getHours();
        if (hour > 22 || hour < 9) {
        	key = 'sleeping';
        } else {
        	key = 'normal';
        }

        var mood = this.moods[key];
        var msg = this.getMessage(mood);

        this.mood = {
        	id: key,
        	message: msg,
        	actions: mood
        };

		return this.mood;
	},

	getMessage: function(mood) {
		return mood.messages[Math.floor(Math.random()*mood.messages.length)];
	}
};
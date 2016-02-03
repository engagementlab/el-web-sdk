
var _keystone = require('keystone');

// moods:
// sleeping, normal, bored, dead, happy, heartbroken, sad, ecstatic

module.exports = {
	
	mood: 'normal',
	happiness: 0.5,
	health: 1.0,
	lastInteraction: 0,

	moods: {
		ecstatic: {
			messages: [
				'ecstatic'
			],
			actions: [ 'insult', 'punch' ]
		},
		happy: {
			messages: [
				'happy'
			],
			actions: [ 'tickle', 'insult' ]
		},
		normal: {
			messages: [
				'Errol is feeling pretty normal today!',
				'Look at this freakin ghost! Have you ever seen a more content otherworldly spirit?',
				'Errol\'s like, "sometimes you just gotta chill haha."'
			],
			actions: [ 'tickle', 'insult' ]
		},
		sad: {
			messages: [
				'sad'
			],
			actions: [ 'tickle', 'insult' ]
		},
		heartbroken: {
			messages: [
				'heartbroken'
			],
			actions: [ 'tickle', 'punch' ]
		},
		hurt: {
			messages: [
				'hurt'
			],
			actions: [ 'punch', 'heal' ]
		},
		sleeping: {
			messages: [
				'SHHH!!! Errol\'s sleeping. Keep it down silly ;)',
				'Do ghosts dream? Errol\'s investigating!',
				'Nope - that\'s not sleep apnea. This ghost just had a real busy day!'
			],
			actions: [ 'wake' ]
		},
		dead: {
			messages: [
				'Yep that\'s a dead ghost all right.',
				'Even ghosts can die... "boo" hoo, right? lol',
				'Dang the "best" ones really do die young huh.'
			],
			actions: [ 'revive' ]
		},
		bored: {
			messages: [
				'Ugh Errol is so bored.',
				'Add some excitement into Errol\'s boring ghosty life.',
				'So. Bored. Boring. Boredom. Errol come on!!'
			],
			actions: [ 'tickle', 'insult' ]
		}
	},

	getMood: function(model) {
		
		var key = this.mood.id;
		if (key === 'dead') {

		} else {

			var hour = new Date().getHours();
	       	
	       	// Be asleep between 10pm and 9am - wow! Errol sure sleeps a lot :)
	        if (hour > 22 || hour < 9) {
	        	key = 'sleeping';
	        } else {
	        	key = 'normal';

	        	// Get bored after a week of no interactions
	        	// also reset values
	        	if (Date.now() - model.lastInteraction > 864000000*7) {
	        		// this.happiness = 0.5;
	        		// this.health = 1.0;
	        		key = 'bored';
	        	}
	        	
	        	if (model.health < 100) {
	        		if (model.health >= 50)
	        			key = 'hurt';
	        		else
	        			key = 'dead';
	        	} else {
		        	if (model.happiness == 100)
		        		key = 'ecstatic';
		        	else if (model.happiness >= 75)
		        		key = 'happy';
		        	else if (model.happiness > 25)
		        		key = 'normal';
		        	else if (model.happiness > 0)
		        		key = 'sad';
		        	else
		        		key = 'heartbroken';
		        }

	        }
		}

        var mood = this.moods[key];
        var msg = this.getMessage(mood);

        this.mood = {
        	id: key,
        	message: msg,
        	actions: mood.actions
        };

		return this.mood;
	},

	getMessage: function(mood) {
		return mood.messages[Math.floor(Math.random()*mood.messages.length)];
	}
};

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
				'Gosh dang DARNit!! This ghost is hip-Hop-CRAZY alright!',
				'omg who can handle this much joy right??? :D',
				'Hahaha Errol is in such good spirits right now, like really'
			],
			actions: [ 'insult', 'punch' ]
		},
		happy: {
			messages: [
				'Oh wow this ghost is just so happy!',
				'Errol looks so nice when he\'s overflowing with love',
				'Now that is one happy camper!'
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
				'Oh dang that\'s a sad face',
				'Ugh i really hate to see him like this',
				'Well we can\'t be happy all the time right Errol?'
			],
			actions: [ 'tickle', 'insult' ]
		},
		heartbroken: {
			messages: [
				'Oh geeeez have you ever seen a ghost this sad eh?',
				'That\'s just about the saddest ghost ever huh. Just so unhappy and like really sad :\'(',
				'Wow things are really tough for Errol these days'
			],
			actions: [ 'tickle', 'punch' ]
		},
		hurt: {
			messages: [
				'OOff! Errol\'s in SO much physical pain',
				'What a bunch of agony Errol looks to be in right now',
				'That right there is a "hurting" ghost'
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

	actions: {
		tickle: {
			labels: [ 
				'tickle that ghost',
				'compliment hat',
				'bear hug'
			]
		},
		insult: {
			labels: [
				'call that ghost stupid',
				'insult hat',
				'ignore that beautiful face'
			]
		},
		punch: {
			labels: [ 
				'punch directly in the neck',
				'kick shins',
				'poke every eye'
			]
		},
		heal: {
			labels: [
				'offer soothing remedy',
				'bless with sage oils',
				'bandage ghost wounds'
			]
		},
		revive: {
			labels: [
				'bring back to "life"',
				'perform CPR',
				'resurrect those old bones'
			]
		},
		wake: {
			labels: [ 'wake' ]
		}
	},

	getMood: function(model) {
		
		var key = this.mood.id;
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
        	
        	console.log(model.health);
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

        var mood = this.moods[key];
        var msg = this.getMessage(mood);
        var acts = this.getActions(mood);

        this.mood = {
        	id: key,
        	message: msg,
        	actions: acts
        };

		return this.mood;
	},

	getMessage: function(mood) {
		return mood.messages[Math.floor(Math.random()*mood.messages.length)];
	},

	getActions: function(mood) {
		var acts = [];
		for (var i = 0; i < mood.actions.length; i++) {
			var key = mood.actions[i];
			var labels = this.actions[key].labels;
			acts.push({
				id: key,
				label: labels[Math.floor(Math.random()*labels.length)]
			});
		};
		return acts;
	}
};
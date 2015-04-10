var vow = require('vows'),
		assert = require('assert');
vow.describe('a good suite').addBatch({
	'when all contexts': {
		topic: function(){return true;},
		'are valid': {
			assert.equal(topic,true);
		}
	}
}).export.(module);

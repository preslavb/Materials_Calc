import Ember from 'ember';

// Set the initial constants
export default Ember.Route.extend({
  model()
  {
  	this.get('store').push({
  	  data: [{
  	  	id: 1,
  	  	type: 'material',

  	  	attributes: {
  	  	  name: "Outside Surface",
  	  	  thickness: "-",
  	  	  kValue: "-",
  	  	  resistivity: 0.04,
  	  	  isConst: true
  	  	},

  	  	relationships: {}
  	  },

  	  {
  	  	id: 2,
  	  	type: 'material',

  	  	attributes: {
  	  	  name: "Inside Surface",
  	  	  thickness: "-",
  	  	  kValue: "-",
  	  	  resistivity: 0.13,
  	  	  isConst: true
  	  	}
  	  }]
  	})
  }
});

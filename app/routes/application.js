import Ember from 'ember';

//Set the initial constants
export default Ember.Route.extend({
  model() {
  	this.get('store').push({
  	  data: [{
  	  	id: 1,
  	  	type: 'material',
  	  	attributes: {
  	  	  name: "Outside Surface",
  	  	  thickness: "-",
  	  	  k_value: "-",
  	  	  resistivity: 0.04,
  	  	  is_const: true
  	  	},
  	  	relationships: {}
  	  },
  	  {
  	  	id: 2,
  	  	type: 'material',
  	  	attributes: {
  	  	  name: "Inside Surface",
  	  	  thickness: "-",
  	  	  k_value: "-",
  	  	  resistivity: 0.13,
  	  	  is_const: true
  	  	}
  	  }]
  	})
  }
});

import DS from 'ember-data';

//Model for the materials
export default DS.Model.extend({
  name: DS.attr(),
  thickness: DS.attr('number'),
  k_value: DS.attr('number'),
  resistivity: DS.attr('number'),
  
  //Calculate the resistivity of the material and round it down to the 3rd digit after the dot
  resistivityFinal: Ember.computed('thickness', 'k_value', 'resistivity', function()  {
  	if(this.get('resistivity') == undefined){
  	  return this.get('thickness')/this.get('k_value');
  	}
  	else{
  	  return this.get('resistivity');
  	}
  }),
  
  //Used for rendering purposes (not drawing a delete button for constants)
  is_const: DS.attr('boolean', { defaultValue: false})
});

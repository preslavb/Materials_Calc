import Ember from 'ember';

export default Ember.Component.extend({
  //Ensures that the formatting of the table is correct by removing the <div> element surrounding a component by default. (Causes component to have the whole row in one table cell if ommited!)
  tagName: "",
  
  actions:  {
  	//Requires a reference to the index implementation of the method. Acts as a "proxy" as it currently is.
    deleteMaterial(materialID)  {
      this.sendAction('deleteMaterial', materialID);
    }
  }
});

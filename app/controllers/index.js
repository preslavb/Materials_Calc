import Ember from 'ember';

export default Ember.Controller.extend({

  // Store the outside and inside surface references from the Store for use in the template by direct reference (using Handlebars)
  outsideSurface: Ember.computed('model', function()
  {
    return this.get('model').objectAt(0);
  }),

  insideSurface: Ember.computed('model', function()
  {
    return this.get('model').objectAt(1);
  }),

  // Calculate the total resistivity every time model.length changes
  totalResistivity: Ember.computed('model.length', function()
  {
    let total = 0;

    this.get('model').forEach(record => {
      total += record.get('resistivityFinal');
    });

    return total;
  }),

  // Calculate the U-Value every time model.length changes
  uValue: Ember.computed('model.length', function()
  {
    return 1 / this.get('totalResistivity');
  }),

  // Create a Store record of a new material using the values from the form
  actions: {
    submitFormData()
    {
      let { name, thickness, kValue } = this;

      // Get all of the materials in model
      let recordsToCompare = this.store.peekAll('material');

      // Bool tracking whether a match was found
      let recordAlreadyInModel = false;

      // Only check the records for a match if there are any records in the model
      if (recordsToCompare.get('length') !== 0) {

        // Loop through all records and compare them to the one being added. If it is a complete match, then set the tracking bool to true
        recordsToCompare.forEach(recordToCompare => {
          if (recordToCompare.get('name') === name &&
              recordToCompare.get('thickness') === thickness &&
              recordToCompare.get('kValue') === kValue
          ) {
            recordAlreadyInModel = true;
          }
        });
      }

      // If there were no matches found, add the material to the model
      if (! recordAlreadyInModel) {
        this.store.createRecord('material', {
          name: name,
          thickness: thickness,
          kValue: kValue
        });
      }

      else {
        alert("Record already saved in materials");
      }
    },

    deleteMaterial(materialID)
    {
      // Store a local copy of all materials currently in the Data Store, then delete the one corresponding to the ID of the component pressed
      let materials = this.store.peekAll('material');

      materials.objectAt(materialID).destroyRecord();
    }
  }
});

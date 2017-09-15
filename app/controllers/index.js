import Ember from 'ember';
import Calculator from 'internshi-project/classes/calculator';

export default Ember.Controller.extend({
  // Instantiate the calculator object
  pvCalculator: Calculator.Calculator.create(),

  // Properties to store the current value of the <select> fields
  orientation: "North",
  elevation: 30,
  overshading: "Little or None",

  // All available options for the select fields in an array
  orientationOptions: [
    "North",
    "North-East",
    "North-West",
    "South",
    "South-East",
    "South-West"
  ],

  elevationOptions: [
    30,
    45,
    60,
    0,
    1,
    90
  ],

  overshadingOptions: [
    "Little or None",
    "Modest",
    "Significant",
    "Heavy"
  ],

  // Computed property for displaying the total energy generated on a yearly basis given all of the PVs in the Store
  totalEnergyGenerated: Ember.computed('model.length', function()
  {
    let total = 0;

    this.get('model').forEach(pv => {
      total += this.get('pvCalculator').getEnergyOutput(pv);
      console.log(this.get('pvCalculator').get('solarRadiation'))
    });

    return total;
  }),

  // Create a Store record of a new PV using the values from the form
  actions: {
    submitFormData()
    {
      this.store.createRecord('pv', {
        peakPower: this.get("peakPower"),
        orientation: this.get("orientation"),
        elevation: this.get("elevation"),
        overshading: this.get("overshading")
      });

      let records = this.store.peekAll('pv');
    },

    deletePV(pvID)
    {
      // Store a local copy of all PVs currently in the Data Store, then delete the one corresponding to the ID of the component pressed
      let records = this.store.peekAll('pv');

      records.objectAt(pvID).destroyRecord();
    }
  }
});

import DS from 'ember-data';

// Model for the Photovoltaics (all values taken for the west of scotland)
export default DS.Model.extend({
  peakPower: DS.attr(),
  orientation: DS.attr(),        // North, South, East, West and all possible combinations
  elevation: DS.attr(),          // Also described as tilt in the SAP document. By specification only able to take in 0, 30, 45, 60, 90 degrees
  overshading: DS.attr(),        // Little or None, Modest, Significant or Heavy
});

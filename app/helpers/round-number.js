import Ember from 'ember';

// Helper to round numbers when rendering them, rather than in the actual model (reduces possible rounding errors)
export function roundNumber(params/*, hash*/)
{
  return Math.round(params[0] * (Math.pow(10, params[1]))) / (Math.pow(10, params[1]));
}

export default Ember.Helper.helper(roundNumber);

import Ember from 'ember';

export default Ember.Route.extend({

  // Always return the full list of PVs into "model" (update when there is a change in the collection)
  model()
  {
    let modelToReturn = this.store.peekAll('pv');

    return modelToReturn;
  }
});

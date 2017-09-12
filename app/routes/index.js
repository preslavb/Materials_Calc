import Ember from 'ember';

export default Ember.Route.extend({
  //Always return the full list of materials into "model" (update when there is a change in the collection)
  model()  {
    let modelToReturn = this.store.peekAll('material');

    return modelToReturn;
  }
});

import Ember from 'ember';

export const Calculator = Ember.Object.extend({
  // Constants used throughout the formulas:
  // Month lengths calculated only for years where february is only 28 days long
  monthLenghts: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

  // Solar radiation affecting a horizontal plane (values again only valid for the west of scotland)
  horizontalSolarRadiation: [19, 46, 88, 148, 196, 193, 185, 150, 101, 55, 25, 15],

  // Solar declanation for the UK by month
  solarDeclanation: [-20.7, -12.8, -1.8, 9.8, 18.8, 23.1, 21.2, 13.7, 2.9, -8.7, -18.4, -23.0],

  // Constants for solar flux on vertical and inclined surfaces (these are the k values) based on the different orientations
  solarFluxConstants: Ember.computed('orientation', function()
  {
    if(this.get('orientation') === "North") {
      return [26.3, -38.5, 14.8, -16.5, 27.3, -11.9, -1.06, 0.0872, -0.191];
    }
    else if(this.get('orientation') === "North-West" || this.get('orientation') === "North-East") {
      return [0.165, -3.68, 3.0, 6.38, -4.53, -0.405, -4.38, 4.89, -1.99];
    }
    else if(this.get('orientation') === "East" || this.get('orientation') === "West") {
      return [1.44, -2.36, 1.07, -0.514, 1.89, -1.64, -0.542, -0.757, 0.604];
    }
    else if(this.get('orientation') === "South-West" || this.get('orientation') === "South-East") {
      return [-2.95, 2.89, 1.17, 5.67, -3.54, -4.28, -2.72, -0.25, 3.07];
    }
    else {
      return [-0.66, -0.106, 2.93, 3.63, -0.374, -7.4, -2.71, -0.991, 4.59];
    }
  }),

  // Formulas and calculations:
  // Conversion factor for converting between horizontal solar radiation and tilted, using a specified tilt angle
  conversionFactor: Ember.computed('orientation', 'elevation', function()
  {
    let fluxConstants = this.get('solarFluxConstants');
    let elevation = this.get('elevation')  * (Math.PI / 180);
    let declanation = this.get('solarDeclanation');
    let latitude = 55.9  * (Math.PI / 180);

    // The three values required for the formula
    let a = fluxConstants[0] * Math.pow(Math.sin(elevation), 3) +
            fluxConstants[1] * Math.pow(Math.sin(elevation), 2) +
            fluxConstants[2] * Math.sin(elevation);

    let b = fluxConstants[3] * Math.pow(Math.sin(elevation), 3) +
            fluxConstants[4] * Math.pow(Math.sin(elevation), 2) +
            fluxConstants[5] * Math.sin(elevation);

    let c = fluxConstants[6] * Math.pow(Math.sin(elevation), 3) +
            fluxConstants[7] * Math.pow(Math.sin(elevation), 2) +
            fluxConstants[8] * Math.sin(elevation) + 1;

    let conversionFactor = [];

    for (var i = 0; i < 12; i++) {
      conversionFactor[i] = (a * Math.cos(latitude - (declanation[i]  * (Math.PI / 180)))) + (b * Math.cos(latitude - (declanation[i] * (Math.PI / 180)))) + c;
    }
    return conversionFactor;
  }),

  // Converted tilted solar radiation
  solarRadiation: Ember.computed('orientation', 'elevation', function()
  {
    let horizontalSolarRadiation = this.get('horizontalSolarRadiation');
    let conversionFactor = this.get('conversionFactor');
    let radiation = [];

    for (var i = 0; i < 12; i++) {
      radiation[i] = horizontalSolarRadiation[i] * conversionFactor[i];
    }

    return radiation;
  }),

  // The total amount of solar radiation hitting the tilted plane in a year
  annualSolarRadiation: Ember.computed('orientation', 'elevation', function()
  {
    let monthLenghts = this.get('monthLenghts');
    let solarRadiation = this.get('solarRadiation');
    let annualSolarRadiation = 0;

    for (var i = 0; i < monthLenghts.length; i++) {
      annualSolarRadiation += 0.024 * monthLenghts[i] * solarRadiation[i];
    }

    return annualSolarRadiation;
  }),

  // Calculate how much the overshading factor will be depending on the input the user gave in the form
  overshadingFactor: Ember.computed('overshading', function()
  {
    let overshading = this.get('overshading');

    switch (overshading) {
      case "Heavy":
        return 0.5;
      case "Significant":
        return 0.65;
      case "Modest":
        return 0.8;
      case "Little or None":
        return 1;
      default:
        return 1;
    }
  }),

  // Computed property returning the annual electricity production of the PV
  annualElectricityProduction: Ember.computed('peakPower', 'orientation', 'elevation', 'overshading', function()
  {
    let annualSolarRadiation = this.get('annualSolarRadiation');
    let overshadingFactor = this.get('overshadingFactor');
    let peakPower = this.get('peakPower');

    return 0.8 * peakPower * annualSolarRadiation * overshadingFactor;
  }),

  // Return the annual energy output of the Photovoltaic passed as the method's parameter
  getEnergyOutput(pv)
  {
    this.set('peakPower', pv.get('peakPower'));
    this.set('elevation', pv.get('elevation'));
    this.set('orientation', pv.get('orientation'));
    this.set('overshading', pv.get('overshading'));

    return this.get('annualElectricityProduction');
  }
});

<p align='left'>
  <a href='https://carbonplan.org/#gh-light-mode-only'>
    <img
      src='https://carbonplan-assets.s3.amazonaws.com/monogram/dark-small.png'
      height='48px'
    />
  </a>
  <a href='https://carbonplan.org/#gh-dark-mode-only'>
    <img
      src='https://carbonplan-assets.s3.amazonaws.com/monogram/light-small.png'
      height='48px'
    />
  </a>
</p>

# seaweed-farming-model

Interactive map tool for exploring the costs of growing seaweed alongside its potential climate benefits.

![npm](https://img.shields.io/npm/v/@carbonplan/seaweed-farming-model?style=flat-square)
![GitHub](https://img.shields.io/github/license/carbonplan/seaweed-farming-web?style=flat-square)

This interactive tool explores the costs of growing seaweed alongside its potential climate benefits over a year-long timescale. It was built by a collaborative team including UC Irvine, NCAR, and CarbonPlan, with funding from ClimateWorks.

Based on user-specified parameters and a target end use, the tool let's users visualize the output of a combined biophysical and technoeconomic model. At a high-level, the model parameterizes different lifecycle scenarios for growing and utilizing seaweed for potential climate benefits, either growth and sinking for carbon removal, or growth and utilization in products. The model is described in detail in [preprint](https://doi.org/10.31223/X5PG9V) and the [explainer article](https://carbonplan.org/research/seaweed-farming-explainer).

## installation

If you use npm, you can install the library:

```shell
npm install @carbonplan/seaweed-farming-model
```

## API reference

There are just three methods:

### <a href="#calculateCost" name="calculateCost">#</a> `calculateCost(target, values, parameters)` [<>](https://github.com/carbonplan/seaweed-farming-web/blob/main/model/src/utils.js "Source")

Returns the cost of producing seaweed in units of $ / ton DW seaweed. Values is expected to be an object of the shape `{ seaweed_dw, depth, d2p, nharv, wave_height, d2sink, species }`. Parameters is expected to be an object of the shape `{ capex, harvestCost, lineCost, opex, transportCost, conversionCost }`.

### <a href="#calculateBenefit" name="calculateBenefit">#</a> `calculateBenefit(target, values, parameters)` [<>](https://github.com/carbonplan/seaweed-farming-web/blob/main/model/src/utils.js "Source")

Returns the cost of producing seaweed in units of tCO2 / ton DW (when `target='sinking'`) or tCO2e / ton DW (when `target='products'`). Values is expected to be an object of the shape `{ seaweed_dw, d2p, fseq_transport, d2sink, species }`. Parameters is expected to be an object of the shape `{ avoidedEmissions, transportEmissions, conversionEmissions, maintenanceEmissions, removalRate }`.

### <a href="#getSpecies" name="getSpecies">#</a> `getSpecies(speciesIndex)` [<>](https://github.com/carbonplan/seaweed-farming-web/blob/main/model/src/utils.js "Source")

Given the index of the species in the data, returns the index to use for indexing into `SPECIES`, `SPECIES_EQUIPMENT_COSTS`, and `SPECIES_LINE_DENSITIES`. This helper is required because multiple species map to the `'temperate brown'` seaweed type.

## license

All the code in this repository is [MIT](https://choosealicense.com/licenses/mit/) licensed, but we request that you please provide attribution if reusing any of our digital content (graphics, logo, articles, etc.).

## about us

CarbonPlan is a non-profit organization that uses data and science for climate action. We aim to improve the transparency and scientific integrity of climate solutions with open data and tools. Find out more at [carbonplan.org](https://carbonplan.org/) or get in touch by [opening an issue](https://github.com/carbonplan/seaweed-farming-web/issues/new) or [sending us an email](mailto:hello@carbonplan.org).

## contributors

The model was implemented in JavaScript and GLSL by CarbonPlan staff. The following individuals provided guidance and/or feedback on the implementation of the model:

- Julianne DeAngelo (UC Irvine, @jdeang9)
- Steve Davis (UC Irvine)

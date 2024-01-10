<p align="left" >
<a href='https://carbonplan.org'>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://carbonplan-assets.s3.amazonaws.com/monogram/light-small.png">
  <img alt="CarbonPlan monogram." height="48" src="https://carbonplan-assets.s3.amazonaws.com/monogram/dark-small.png">
</picture>
</a>
</p>

# carbonplan / seaweed-farming-web

**interactive map tool for exploring the costs of growing seaweed alongside its potential climate benefits**

[![CI](https://github.com/carbonplan/seaweed-farming-web/actions/workflows/main.yml/badge.svg)](https://github.com/carbonplan/seaweed-farming-web/actions/workflows/main.yml)
![GitHub deployments](https://img.shields.io/github/deployments/carbonplan/seaweed-farming-web/production?label=vercel)
![NPM Version](https://img.shields.io/npm/v/@carbonplan/seaweed-farming-model)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This interactive tool explores the costs of growing seaweed alongside its potential climate benefits over a year-long timescale. It was built by a collaborative team including UC Irvine, NCAR, and CarbonPlan, with funding from ClimateWorks.

Based on user-specified parameters and a target end use, the tool let's users visualize the output of a combined biophysical and technoeconomic model. At a high-level, the model parameterizes different lifecycle scenarios for growing and utilizing seaweed for potential climate benefits, either growth and sinking for carbon removal, or growth and utilization in products. The model is described in detail in the [paper](https://doi.org/10.1038/s41477-022-01305-9) and the [explainer article](https://carbonplan.org/research/seaweed-farming-explainer).

## building the site

Assuming you already have `Node.js` installed, you can install the build dependencies as:

```shell
npm install .
```

To start a development version of the site, simply run:

```shell
npm run dev
```

and then visit `http://localhost:5002` in your browser.

## map tiles

To render the map tool itself, you need to stage the input data layers where they can be accessed over HTTP. This is done in `notebooks/data_processing.ipynb`. Dependencies for this notebook include:

- Python 3
- Jupyter Notebook
- the Python dependencies specified in `notebooks/requirements.txt`

## license

All the code in this repository is [MIT](https://choosealicense.com/licenses/mit/)-licensed, but we request that you please provide attribution if reusing any of our digital content (graphics, logo, articles, etc.).

## about us

CarbonPlan is a nonprofit organization that uses data and science for climate action. We aim to improve the transparency and scientific integrity of climate solutions with open data and tools. Find out more at [carbonplan.org](https://carbonplan.org/) or get in touch by [opening an issue](https://github.com/carbonplan/seaweed-farming-web/issues/new) or [sending us an email](mailto:hello@carbonplan.org).

## contributors

The web tool was developed by CarbonPlan staff. The following individuals provided data and/or input on the implementation of the tool:

- Julianne DeAngelo (UC Irvine, @jdeang9)
- Steve Davis (UC Irvine)
- Lydia Kapsenberg (CEA Consulting)

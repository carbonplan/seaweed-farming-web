<p align="left">
  <a href="https://carbonplan.org/#gh-light-mode-only">
    <img
      src="https://carbonplan-assets.s3.amazonaws.com/monogram/dark-small.png"
      height="48px"
    />
  </a>
  <a href="https://carbonplan.org/#gh-dark-mode-only">
    <img
      src="https://carbonplan-assets.s3.amazonaws.com/monogram/light-small.png"
      height="48px"
    />
  </a>
</p>

# carbonplan / macroalgae

Interactive tool for exploring the costs of growing macroalgae alongside its potential climate benefits. 

![GitHub branch checks state](https://img.shields.io/github/checks-status/carbonplan/macroalgae/main?style=flat-square)
![GitHub deployments](https://img.shields.io/github/deployments/carbonplan/macroalgae/production?label=docs&style=flat-square)

TODO: add additional details on the tool, the reference paper, the explainer, etc.

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

All the code in this repository is [MIT](https://choosealicense.com/licenses/mit/) licensed, but we request that you please provide attribution if reusing any of our digital content (graphics, logo, articles, etc.).

## about us

CarbonPlan is a non-profit organization that uses data and science for climate action. We aim to improve the transparency and scientific integrity of carbon removal and climate solutions through open data and tools. Find out more at [carbonplan.org](https://carbonplan.org/) or get in touch by [opening an issue](https://github.com/carbonplan/macroalgae/issues/new) or [sending us an email](mailto:hello@carbonplan.org).

## contributors

The web tool was developed by CarbonPlan staff. The following individuals provided data and/or input on the implementation of the tool:

- Julianne DeAngelo (UC Irvine, @jdeang9)
- Steve Davis (UC Irvine)
- Lydia Kapsenberg (CEA Consulting)

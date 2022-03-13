import numpy as np
import xarray as xr


def compute_grid_area(da):
    """
    Compute the geographic area (in square meters) of every pixel in the data array provided.

    Parameters
    ----------
    da : xarray.DataArray
        DataArray with spatial coordinates longitude and latitude

    Returns
    -------
    areacella : xarray.DataArray
        DataArray with grid cell areas in square meters
    """
    R = 6.371e6
    SQM_PER_HA = 10000
    dϕ = np.radians((da["latitude"][1] - da["latitude"][0]).values)
    dλ = np.radians((da["longitude"][1] - da["longitude"][0]).values)
    dA = R ** 2 * np.abs(dϕ * dλ) * np.cos(np.radians(da["latitude"]))
    areacella = dA * xr.ones_like(da)

    return areacella / SQM_PER_HA

import os
import sys

def build_basemap():

    cmds = []

    cmds.append('rm -rf processed/basemap ')
    cmds.append('rm -rf tmp ')
    cmds.append('mkdir tmp ')

    cmds.append(
        'tippecanoe '
        '-z5 '
        '-o tmp/water.mbtiles '
        '--no-feature-limit '
        '--no-tile-size-limit '
        '--extend-zooms-if-still-dropping '
        '--no-tile-compression '
        'raw/ne_10m_lakes.geojson '
    )

    cmds.append(
        'tippecanoe '
        '-Z0 '
        '-z2 '
        '-o tmp/countries.mbtiles '
        '--no-feature-limit '
        '--no-tile-size-limit '
        '--extend-zooms-if-still-dropping '
        '--no-tile-compression '
        'raw/ne_10m_admin_0_countries.geojson '
    )

    cmds.append(
        'tippecanoe '
        '-Z3 '
        '-z5 '
        '-o tmp/provinces.mbtiles '
        '--no-feature-limit '
        '--no-tile-size-limit '
        '--extend-zooms-if-still-dropping '
        '--no-tile-compression '
        'raw/ne_10m_admin_1_states_provinces.geojson '
    )

    cmds.append(
        'tile-join '
        '-o tmp/basemap.mbtiles '
        '--no-tile-compression '
        '--no-tile-size-limit '
        'tmp/water.mbtiles '
        'tmp/countries.mbtiles '
        'tmp/provinces.mbtiles '
    )

    cmds.append(
        'mb-util '
        '--image_format=pbf ' 
        'tmp/basemap.mbtiles '
        'processed/basemap'
    )

    cmds.append('rm -rf tmp ')

    [os.system(cmd) for cmd in cmds]

if __name__ == '__main__':
    args = sys.argv
    choice = args[1]

    switcher = {
        'basemap': build_basemap
    }

    if choice not in switcher.keys():
        print(f'choice "{choice}" not recognized')
    else:
        switcher[choice]()

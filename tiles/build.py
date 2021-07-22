import os
import sys

def build_macroalgae():
    cmds = []
    cmds.append('rm -rf processed/macroalgae ')
    cmds.append('rm -rf tmp ')
    cmds.append('mkdir tmp ')

    cmds.append(
        'tippecanoe '
        '-Z0 '
        '-z0 '
        '-o tmp/macroalgae-0.mbtiles '
        '-l macroalgae '
        '--no-tile-size-limit '
        '--no-tile-compression '
        'raw/16.json '
    )
    cmds.append(
        'tippecanoe '
        '-Z1 '
        '-z1 '
        '-o tmp/macroalgae-1.mbtiles '
        '-l macroalgae '
        '--no-tile-size-limit '
        '--no-tile-compression '
        'raw/16.json '
    )
    cmds.append(
        'tippecanoe '
        '-Z2 '
        '-z2 '
        '-o tmp/macroalgae-2.mbtiles '
        '-l macroalgae '
        '--no-tile-size-limit '
        '--no-tile-compression '
        'raw/8.json '
    )
    cmds.append(
        'tippecanoe '
        '-Z3 '
        '-z3 '
        '-o tmp/macroalgae-3.mbtiles '
        '-l macroalgae '
        '--no-tile-size-limit '
        '--no-tile-compression '
        'raw/4.json '
    )
    cmds.append(
        'tippecanoe '
        '-Z4 '
        '-z4 '
        '-o tmp/macroalgae-4.mbtiles '
        '-l macroalgae '
        '--no-tile-size-limit '
        '--no-tile-compression '
        'raw/2.json '
    )
    cmds.append(
        'tippecanoe '
        '-Z5 '
        '-z5 '
        '-o tmp/macroalgae-5.mbtiles '
        '-l macroalgae '
        '--no-tile-size-limit '
        '--no-tile-compression '
        'raw/1.json '
    )

    cmds.append(
        'tile-join '
        '-o tmp/macroalgae.mbtiles '
        '--no-tile-compression '
        '--no-tile-size-limit '
        'tmp/macroalgae-0.mbtiles '
        'tmp/macroalgae-1.mbtiles '
        'tmp/macroalgae-2.mbtiles '
        'tmp/macroalgae-3.mbtiles '
        'tmp/macroalgae-4.mbtiles '
        'tmp/macroalgae-5.mbtiles '
    )

    cmds.append(
        'mb-util '
        '--image_format=pbf ' 
        'tmp/macroalgae.mbtiles '
        'processed/macroalgae'
    )

    cmds.append('rm -rf tmp ')
    [os.system(cmd) for cmd in cmds]


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
        '-z5 '
        '-o tmp/countries.mbtiles '
        '--no-feature-limit '
        '--no-tile-size-limit '
        '--extend-zooms-if-still-dropping '
        '--no-tile-compression '
        'raw/ne_10m_admin_0_countries.geojson '
    )

    cmds.append(
        'tile-join '
        '-o tmp/basemap.mbtiles '
        '--no-tile-compression '
        '--no-tile-size-limit '
        'tmp/water.mbtiles '
        'tmp/countries.mbtiles '
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
        'basemap': build_basemap,
        'macroalgae': build_macroalgae
    }

    if choice not in switcher.keys():
        print(f'choice "{choice}" not recognized')
    else:
        switcher[choice]()

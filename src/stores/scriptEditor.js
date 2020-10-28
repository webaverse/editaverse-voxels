import { writable } from 'svelte/store';

export default () => writable([
  'const size = 16;',
  'const origin = { x: -16, z: -8 };',
  'const center = size * 0.5 - 0.5;',
  'const simplex = new SimplexNoise(Math.random());',
  '',
  '// comment out this line for incremental updates',
  'reset();',
  '',
  '// box helper',
  'box(',
  '  origin.x, 0, origin.z,  // position',
  '  size, 1, size,          // size',
  '  1                       // block type',
  ');',
  '',
  '// sphere helper',
  'sphere(',
  '  -1, size - 1, -size + 1,  // position',
  '  size * 0.5,               // radius',
  '  1                         // block type',
  ');',
  '',
  '// brittle hill',
  'for (let x = 0; x < size; x += 1) {',
  '  for (let y = 1; y < size; y += 1) {',
  '    for (let z = 0; z < size; z += 1) {',
  '      const cx = x - center;',
  '      const cz = z - center;',
  '      const h = size * Math.exp(',
  '        -(cx ** 2 + cz ** 2) / (size * 1.5)',
  '      );',
  '      const height = Math.max(Math.min(',
  '        h, size * 2 * simplex.noise3D(cx / 2, y / 2, cz / 2)',
  '      ), 1);',
  '      if (y < height) {',
  '        // update helper',
  '        update(',
  '          origin.x + x, y, origin.z + z,  // position',
  '          1                               // block type',
  '        );',
  '      }',
  '    }',
  '  }',
  '}',
  '',
  '// carve out a tunnel',
  'box(',
  '  origin.x + size * 0.5 - 2, 1, origin.z,',
  '  4, 4, size,',
  '  0',
  ');',
  '',
  '// mirror everything to the side',
  'for (let x = 0; x < size; x += 1) {',
  '  for (let y = 0; y < size; y += 1) {',
  '    for (let z = 0; z < size; z += 1) {',
  '      // clone helper',
  '      clone(',
  '       origin.x + x, y, origin.z + z,  // from',
  '       size - 1 - x, y, origin.z + z   // to',
  '      );',
  '    }',
  '  }',
  '}',
].join('\n'));

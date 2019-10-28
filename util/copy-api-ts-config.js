const shell = require('shelljs');

shell.mkdir('dist/api/');
shell.cp('api/tsconfig.json', 'dist/api/');

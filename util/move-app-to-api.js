const shell = require('shelljs');

shell.mkdir('dist/api/public');
shell.mv('build/', 'dist/api/public');

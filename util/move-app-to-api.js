const shell = require('shelljs');

shell.mkdir('dist/public');
shell.mv('build/*', 'dist/public');

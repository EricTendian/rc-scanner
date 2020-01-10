'use strict';

const childProcess = require('child_process');
const path = require('path');

const clientPath = path.resolve(__dirname, 'client');
const serverPath = path.resolve(__dirname, 'server');

process.stdout.write('Pulling new version from github...');
childProcess.execSync('git reset --hard', { stdio: ['ignore', 'ignore', 'pipe'] });
childProcess.execSync('git pull', { stdio: ['ignore', 'ignore', 'pipe'] });
process.stdout.write(' done\n');

process.stdout.write('Updating node modules...');
childProcess.execSync('npm install', { cwd: clientPath, stdio: ['ignore', 'ignore', 'pipe'] });
childProcess.execSync('npm prune', { cwd: clientPath, stdio: ['ignore', 'ignore', 'pipe'] });
childProcess.execSync('npm install', { cwd: serverPath, stdio: ['ignore', 'ignore', 'pipe'] });
childProcess.execSync('npm prune', { cwd: serverPath, stdio: ['ignore', 'ignore', 'pipe'] });
process.stdout.write(' done\n');

process.stdout.write('Building client app...');
childProcess.execSync('npm run build', { cwd: clientPath, stdio: ['ignore', 'ignore', 'pipe'] });
process.stdout.write(' done\n');

process.stdout.write('Please restart RC Scanner\n')
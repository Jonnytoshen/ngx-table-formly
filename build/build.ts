import * as fs from 'fs';
import { exec } from './util';

const mainPkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const name: string = 'ngx-table-formly';
const distDir = 'dist';

// cleanup
exec(`rm -rf ${distDir}/${name}`);

// build package
exec(`ng build --prod ${name}`);

const pkgDir = `${distDir}/${name}`;
exec(`cp README.md ${pkgDir}`);

// update `FORMLY-VERSION` in package.json for all sub-packages
const pkgPath = `${pkgDir}/package.json`;
const pkgJson = {
  ...JSON.parse(fs.readFileSync(pkgPath, 'utf8')),
  version: mainPkg.version,
  homepage: mainPkg.homepage,
  description: mainPkg.description,
  repository: mainPkg.repository,
  bugs: mainPkg.bugs,
};

fs.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2));

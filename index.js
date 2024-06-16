const { execSync } = require('child_process');
const fs = require('fs');

const packages = fs.readdirSync('node_modules');

packages.forEach(package => {
  try {
    execSync(`npm publish --registry=http://http://localhost:4873/`, {
      cwd: `node_modules/${package}`,
      stdio: 'inherit'
    });
  } catch (err) {
    console.error(`Error publishing ${package}: ${err}`);
  }
});
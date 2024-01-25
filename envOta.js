const jwt = require('jsonwebtoken');
const fs = require('fs');

//To hold Env name and versions
const envObj = {};

// To process command-line arguments from GH actions
process.argv.forEach((arg, index) => {
  if (arg.startsWith('--env')) {
    const name = arg.split('=')[1];
    const version = process.argv[index + 1];
    envObj[name] = version;
  }
});

const secretKey = process.env.SECRET_KEY; 

// Double Checking the Key is present or not
if (!secretKey) {
  console.error('Secret key not provided.');
  process.exit(1);
}

// Convert object to JWT
const token = jwt.sign(envObj, secretKey);

// encrypted file that contains envs and its QB versions
fs.writeFileSync('secretEnvList.txt', token);

console.log('JWT saved to secretEnvList.txt');
// node envOta.js --env=qyrus 1.11.0 --env=wm 1.11.0 --env=qyrus-uk 1.11.0 --env=shawbrook 1.11.0  --env=unum 1.11.0  --env=tsb 1.11.0  --env=cleco 1.11.0  --env=monument 1.11.0  --env=johndeere 1.11.0  --env=truist 1.11.0  --env=rccd 1.11.0 --env=staging 1.6.14
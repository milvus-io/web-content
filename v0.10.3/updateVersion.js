const https = require("https");
console.log(process.argv);
const url = process.argv[2];
const token = process.argv[3];
const commit = process.argv[4];
const version = process.argv[5];

const data = JSON.stringify({
  name: "milvus",
  version,
  token,
  commit,
});

const options = {
  hostname: url,
  port: 443,
  path: "/milvus/version",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.write(data);
req.end();

// Save as task2.js and run: node task2.js /path/to/files your.email@example.com
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const folder = process.argv[2];
const email = (process.argv[3] || "").toLowerCase();

if (!folder || !email) {
  console.error("Usage: node task2.js /path/to/files your.email@example.com");
  process.exit(1);
}

const sha3_256_hex_from_buffer = (buf) =>
  crypto.createHash("sha3-256").update(buf).digest("hex").toLowerCase();
const sha3_256_hex_from_string = (s) =>
  crypto.createHash("sha3-256").update(s, "utf8").digest("hex").toLowerCase();

const emptyHash = sha3_256_hex_from_string("");
const expectedEmpty =
  "a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a";
if (emptyHash !== expectedEmpty)
  console.error("SHA3-256 test vector mismatch:", emptyHash);

const entries = fs.readdirSync(folder, { withFileTypes: true });
const fileNames = entries
  .filter((e) => e.isFile() && !e.name.startsWith("."))
  .map((e) => e.name)
  .sort();

console.log("Files found:", fileNames.length);
fileNames.forEach((fn) => console.log(" -", fn));

const items = fileNames.map((fn) => {
  const buf = fs.readFileSync(path.join(folder, fn));
  const h = sha3_256_hex_from_buffer(buf);
  let prod = 1n;
  for (const ch of h) prod *= BigInt(parseInt(ch, 16) + 1);
  return { name: fn, hash: h, key: prod };
});

items.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
const joined = items.map((x) => x.hash).join("");
const finalString = joined + email;
const finalHash = sha3_256_hex_from_string(finalString);

console.log("\nFINAL:", finalHash);
console.log("Processed files count:", items.length);

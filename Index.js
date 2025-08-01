const fs = require("fs");
const http = require("http");
const https = require("https");
const readline = require("readline");
const { URL } = require("url");

if (process.argv.length !== 4) {
    console.log("Usage: node dir_bruteforce.js <base_url> <wordlist>");
    process.exit(1);
}

const baseUrl = process.argv[2].replace(/\/$/, "");
const wordlist = process.argv[3];
const client = baseUrl.startsWith("https") ? https : http;

const rl = readline.createInterface({
    input: fs.createReadStream(wordlist),
    crlfDelay: Infinity
});

console.log(`[*] Starting brute-force on ${baseUrl}\n`);

rl.on("line", (path) => {
    const targetUrl = `${baseUrl}/${path}`;

    try {
        const req = client.get(targetUrl, (res) => {
            if (res.statusCode < 400) {
                console.log(`[+] Found: ${targetUrl} (Status: ${res.statusCode})`);
            }
        });

        req.on("error", () => {});
        req.setTimeout(3000, () => req.destroy());
    } catch (e) {}
});

rl.on("close", () => {
    console.log("\n[*] Scan complete.");
});

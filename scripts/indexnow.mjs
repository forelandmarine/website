// Notify IndexNow (Bing, Yandex, Seznam, Naver) of every URL in the live sitemap.
// Run after a deploy: node scripts/indexnow.mjs
import { readdirSync } from "node:fs";

const host = "www.forelandmarine.com";
const keyFile = readdirSync(new URL("../public", import.meta.url)).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("IndexNow key file missing from public/");
const key = keyFile.replace(".txt", "");

const xml = await (await fetch(`https://${host}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${keyFile}`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText}, ${urlList.length} URLs`);

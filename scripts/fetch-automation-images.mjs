// One-off: fetch hero images for the automation service pages and the manufacturing industry page.
// Same Unsplash pattern as fetch-images.mjs; picks are fixed by photo id so re-runs are deterministic.
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";
const credits = JSON.parse(await readFile("public/images/credits.json", "utf8"));
const picks = [
  ["services", "industrial-automation", "pWUyHVJgLhg"],
  ["services", "scada-remote-monitoring", "yhCHx8Mc-Kc"],
  ["services", "plc-dcs-engineering", "NAchd3UmxXo"],
  ["services", "automation-system-integration", "JRCkEOYLWXY"],
  ["industries", "manufacturing-industrial", "GiuvVfcNFzY"],
];
for (const [dir, name, id] of picks) {
  const r = await (await fetch(`https://unsplash.com/napi/photos/${id}`, { headers: { "user-agent": "curl/8.9.1" } })).json();
  if (!r?.urls?.raw) { console.error("NO PHOTO", id, JSON.stringify(r).slice(0, 200)); continue; }
  const src = r.urls.raw.split("?")[0] + "?w=1800&q=80&fm=jpg&fit=crop&auto=format";
  const buf = Buffer.from(await (await fetch(src)).arrayBuffer());
  await writeFile(path.join("public/images", dir, `${name}.jpg`), buf);
  const entry = { file: `${dir}/${name}.jpg`, id: r.id, author: r.user?.name, desc: r.alt_description ?? r.description, color: r.color, blur: r.blur_hash, w: r.width, h: r.height };
  const i = credits.findIndex(c => c.file === entry.file);
  if (i >= 0) credits[i] = entry; else credits.push(entry);
  console.log(name, "->", r.id, `${(buf.length / 1024).toFixed(0)}KB`, entry.desc);
}
await writeFile("public/images/credits.json", JSON.stringify(credits, null, 2) + "\n");

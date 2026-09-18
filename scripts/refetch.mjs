import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";
const credits = JSON.parse(await readFile("public/images/credits.json", "utf8"));
const used = new Set(credits.map(c => c.id));
const retry = [
  ["home", "hero-refinery-night", "petrochemical refinery illuminated night", 1600],
  ["home", "hero-mechanical-equipment", "industrial compressor turbine engine machinery", 1200],
  ["services", "piping-fabrication", "steel pipeline industrial pipes refinery", 1800],
  ["industries", "oil-gas", "oil gas field pumpjack", 1800],
  ["industries", "industrial-plants", "industrial factory plant machinery hall", 1800],
  ["pages", "services-index", "industrial steel structure refinery towers", 2000],
];
for (const [dir, name, query, width] of retry) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=25&orientation=landscape`;
  const json = await (await fetch(url, { headers: { "user-agent": "curl/8.9.1" } })).json();
  const pick = json.results.find(r => !r.urls.raw.includes("plus.unsplash.com") && !used.has(r.id) && r.width >= 2000);
  if (!pick) { console.error("NO RESULT", name); continue; }
  used.add(pick.id);
  const src = pick.urls.raw.split("?")[0] + `?w=${width}&q=80&fm=jpg&fit=crop&auto=format`;
  const buf = Buffer.from(await (await fetch(src)).arrayBuffer());
  await writeFile(path.join("public/images", dir, `${name}.jpg`), buf);
  const entry = { file: `${dir}/${name}.jpg`, id: pick.id, author: pick.user?.name, desc: pick.alt_description, color: pick.color, blur: pick.blur_hash, w: pick.width, h: pick.height };
  const i = credits.findIndex(c => c.file === entry.file);
  if (i >= 0) credits[i] = entry; else credits.push(entry);
  console.log(name, "->", pick.id, pick.alt_description);
}
await writeFile("public/images/credits.json", JSON.stringify(credits, null, 2));

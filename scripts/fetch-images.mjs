// One-off asset sourcing script: searches Unsplash for each subject, skips premium
// results, dedupes by photo id, and stores a local optimised JPEG. Not part of the app.
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const manifest = [
  // Home hero — 7 images
  ["home", "hero-offshore-platform", "offshore oil platform sea", 1800],
  ["home", "hero-refinery-night", "oil refinery night lights", 1600],
  ["home", "hero-industrial-piping", "industrial pipes steel plant", 1400],
  ["home", "hero-mechanical-equipment", "industrial turbine machinery", 1200],
  ["home", "hero-welding-fabrication", "welding sparks steel", 1200],
  ["home", "hero-electrical-instrumentation", "industrial control panel gauges", 1200],
  ["home", "hero-control-room-engineer", "engineer helmet industrial plant", 1400],
  // Home sections
  ["home", "about-engineering-site", "petrochemical plant engineer inspection", 1800],
  ["home", "cta-refinery-dusk", "refinery sunset industrial", 2000],
  // Services — one unique image each
  ["services", "mechanical-services", "industrial pump mechanical equipment", 1800],
  ["services", "piping-fabrication", "pipeline steel pipes industrial", 1800],
  ["services", "welding-fabrication", "welder welding metal workshop", 1800],
  ["services", "electrical-instrumentation", "electrical switchgear cabinet wires", 1800],
  ["services", "equipment-installation-maintenance", "crane lifting industrial installation", 1800],
  ["services", "industrial-maintenance", "technician maintenance factory machine", 1800],
  ["services", "oil-gas-technical-support", "oil gas engineer tablet site", 1800],
  ["services", "project-site-technical-services", "construction site industrial project workers", 1800],
  // Industries
  ["industries", "oil-gas", "oil pump jack desert", 1800],
  ["industries", "refineries", "oil refinery towers daytime", 1800],
  ["industries", "petrochemical", "chemical plant storage tanks", 1800],
  ["industries", "industrial-plants", "factory industrial plant interior", 1800],
  ["industries", "energy-infrastructure", "power plant energy infrastructure", 1800],
  ["industries", "marine-offshore", "offshore vessel ship sea rig", 1800],
  // Pages
  ["pages", "about", "dubai skyline industrial night", 2000],
  ["pages", "services-index", "industrial plant steel structure", 2000],
  ["pages", "industries-index", "industrial landscape pipelines aerial", 2000],
  ["pages", "projects", "oil gas construction site crane", 2000],
  ["pages", "contact", "dubai city skyline", 2000],
];

const used = new Set();
const credits = [];
for (const [dir, name, query, width] of manifest) {
  const outDir = path.join("public/images", dir);
  await mkdir(outDir, { recursive: true });
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=20&orientation=landscape`;
  const res = await fetch(url, { headers: { "user-agent": "curl/8.9.1" } });
  const json = await res.json();
  const pick = json.results.find((r) => !r.urls.raw.includes("plus.unsplash.com") && !used.has(r.id) && r.width >= 2000);
  if (!pick) { console.error("NO RESULT", name); continue; }
  used.add(pick.id);
  const src = pick.urls.raw.split("?")[0] + `?w=${width}&q=80&fm=jpg&fit=crop&auto=format`;
  const buf = Buffer.from(await (await fetch(src)).arrayBuffer());
  await writeFile(path.join(outDir, `${name}.jpg`), buf);
  credits.push({ file: `${dir}/${name}.jpg`, id: pick.id, author: pick.user?.name, desc: pick.alt_description, color: pick.color, blur: pick.blur_hash, w: pick.width, h: pick.height });
  console.log(name, "->", pick.id, (buf.length / 1024).toFixed(0) + "KB", pick.alt_description);
}
await writeFile("public/images/credits.json", JSON.stringify(credits, null, 2));

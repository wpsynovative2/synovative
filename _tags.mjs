import puppeteer from "puppeteer-core";
const OUT = process.argv[2];
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new", args: ["--hide-scrollbars","--disable-gpu","--force-device-scale-factor=2"],
});

for (const [name, w, h] of [["tags_desktop",1440,900],["tags_tablet",900,900],["tags_mobile",420,900]]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: name==="tags_desktop"?2:1 });
  await page.goto("http://localhost:3151/services", { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    document.querySelectorAll("*").forEach(e => { e.style.animation = "none"; });
    const ul = document.querySelector("ul.relative");
    ul?.scrollIntoView({ block: "center" });
  });
  await new Promise(r => setTimeout(r, 900));

  if (name === "tags_desktop") {
    // Measure each clasp ring centre against the rope's own drawn height.
    const m = await page.evaluate(() => {
      const svg = document.querySelector("svg[viewBox^='0 0 1200']");
      const box = svg.getBoundingClientRect();
      const clips = [...document.querySelectorAll("li > a > span:first-child > svg")];
      const TOP = 12, SAG = 46;
      return clips.map(c => {
        const r = c.getBoundingClientRect();
        const ringCentreY = r.top + 5 - box.top;          // px from svg top
        const fraction = (r.left + r.width / 2 - box.left) / box.width;
        const ropeY = TOP + 4 * SAG * fraction * (1 - fraction);
        return { f: +fraction.toFixed(3), ring: +ringCentreY.toFixed(1), rope: +ropeY.toFixed(1), delta: +(ringCentreY - ropeY).toFixed(1) };
      });
    });
    console.log("clasp ring vs rope (px):");
    m.forEach((r,i) => console.log(`  tag ${i}  f=${r.f}  ring=${r.ring}  rope=${r.rope}  Δ=${r.delta}`));
  }

  const el = await page.$("ul.relative");
  const b = await el.boundingBox();
  await page.screenshot({ path: `${OUT}/${name}.png`, clip: { x: Math.max(0,b.x-20), y: Math.max(0,b.y-70), width: Math.min(w, b.width+40), height: b.height+100 } });
  console.log(name, "captured");
  await page.close();
}
await browser.close();

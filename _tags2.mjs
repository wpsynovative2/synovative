import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new", args: ["--hide-scrollbars","--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3151/services", { waitUntil: "networkidle0" });
await page.evaluate(() => document.querySelectorAll("*").forEach(e => e.style.animationName = "none"));
await new Promise(r => setTimeout(r, 700));

const m = await page.evaluate(() => {
  // The rope is the only 80-unit-tall 1200 box, and it is a sibling of the tag list.
  const rope = document.querySelector("svg[viewBox='0 0 1200 80']");
  const list = rope.parentElement.querySelector("ul");
  const box = rope.getBoundingClientRect();
  const TOP = 12, SAG = 46;

  // Sample the rope's real rendered geometry rather than trusting the formula.
  const path = rope.querySelector("path");
  const len = path.getTotalLength();

  return [...list.children].map((li) => {
    const clip = li.querySelector("a > span:first-child > svg");
    const r = clip.getBoundingClientRect();
    const ringX = r.left + r.width / 2 - box.left;
    const ringY = r.top + 5 - box.top;

    // Walk the path for the point nearest this x, in user units -> px (1:1 vertically).
    let best = null;
    for (let i = 0; i <= 200; i++) {
      const p = path.getPointAtLength((i / 200) * len);
      const px = (p.x / 1200) * box.width;
      if (!best || Math.abs(px - ringX) < Math.abs(best.px - ringX)) best = { px, y: p.y };
    }
    const fraction = ringX / box.width;
    return {
      f: +fraction.toFixed(3),
      ringY: +ringY.toFixed(1),
      ropeY_drawn: +best.y.toFixed(1),
      ropeY_formula: +(TOP + 4 * SAG * fraction * (1 - fraction)).toFixed(1),
      delta: +(ringY - best.y).toFixed(1),
    };
  });
});
console.log("clasp ring centre vs the rope's actual drawn path:");
m.forEach((r, i) => console.log(`  tag ${i}  f=${String(r.f).padEnd(6)} ring=${String(r.ringY).padEnd(6)} rope(drawn)=${String(r.ropeY_drawn).padEnd(6)} rope(formula)=${String(r.ropeY_formula).padEnd(6)} Δ=${r.delta}`));
await browser.close();

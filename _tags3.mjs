import puppeteer from "puppeteer-core";
const OUT = process.argv[2];
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new", args: ["--hide-scrollbars","--disable-gpu"],
});
for (const [name, path, w, dark] of [
  ["fix_desktop", "/services", 1440, false],
  ["fix_home",    "/",         1440, false],
  ["fix_dark",    "/services", 1440, true],
  ["fix_tablet",  "/services", 820,  false],
  ["fix_mobile",  "/services", 400,  false],
]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: 950, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: dark ? "dark" : "light" }]);
  await page.goto("http://localhost:3152" + path, { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 2500));
  await page.evaluate(() => document.querySelectorAll("*").forEach(e => e.style.animationName = "none"));
  const box = await page.evaluate(() => {
    const rope = document.querySelector("svg[viewBox='0 0 1200 80']");
    const wrap = rope.parentElement;
    wrap.scrollIntoView({ block: "center" });
    return null;
  });
  await new Promise(r => setTimeout(r, 900));
  const b = await page.evaluate(() => {
    const rope = document.querySelector("svg[viewBox='0 0 1200 80']");
    const r = rope.parentElement.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  await page.screenshot({ path: `${OUT}/${name}.png`, clip: {
    x: Math.max(0, b.x - 16), y: Math.max(0, b.y - 30),
    width: Math.min(w - Math.max(0, b.x - 16), b.width + 32), height: b.height + 260 } });
  console.log(name, "ok");
  await page.close();
}
await browser.close();

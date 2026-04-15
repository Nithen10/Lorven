import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
const url = process.env.BASE_URL || "http://127.0.0.1:3000";
await page.goto(url);
await page.waitForTimeout(1200);

const checks = await page.evaluate(() => {
  const title = document.querySelector("h1")?.textContent?.trim();
  const cards = document.querySelectorAll(".service-card").length;
  const nav = getComputedStyle(document.querySelector(".nav")).position;
  const bodyBg = getComputedStyle(document.body).backgroundColor;
  return { title, cards, nav, bodyBg, height: document.documentElement.scrollHeight };
});

if (checks.title !== "Lorven AI studio.") throw new Error(`Unexpected hero title: ${checks.title}`);
if (checks.cards !== 5) throw new Error(`Expected 5 service cards, found ${checks.cards}`);
if (checks.height < 6000) throw new Error(`Page height looks too small: ${checks.height}`);

await page.screenshot({ path: "lorven-home.png", fullPage: false });
await page.setViewportSize({ width: 390, height: 900 });
await page.waitForTimeout(500);
await page.screenshot({ path: "lorven-mobile.png", fullPage: false });

console.log(JSON.stringify(checks, null, 2));
await browser.close();

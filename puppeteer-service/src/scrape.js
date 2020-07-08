const puppeteer = require("puppeteer");
const genericPool = require("generic-pool");

const EMPTY_URL = "https://example.org";

const pool = genericPool.createPool({
  create: async () => {
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });
    const page = await browser.newPage();
    return { browser, page };
  },
  destroy: ({ browser }) => browser.close(),
});

const scrape = async (url) =>
  pool.use(async ({ page }) => {
    await page.goto(url, { waitUntil: "networkidle2" });
    const screenshot = await page.screenshot();
    await page.goto(EMPTY_URL);
    return screenshot;
  });

module.exports = scrape;

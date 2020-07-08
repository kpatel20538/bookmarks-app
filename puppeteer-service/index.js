const Koa = require("koa");
const koaBody = require("koa-body");
const slugify = require("slugify");

const scrape = require("./src/scrape");
const compress = require("./src/compress");
const upload = require("./src/upload");
const notify = require("./src/notify");

const screenshot = async ({ id, title, url }) => {
  console.log(`(${id}) Init: ${title}`);

  const uncompressed = await scrape(url);
  console.log(`(${id}) Uncompressed: ${uncompressed.length}`);

  const compressed = await compress(uncompressed);
  console.log(`(${id}) Compressed: ${compressed.length}`);

  const objectName = `${slugify(title)}-${id}.png`;
  console.log(`(${id}) Object Name: ${objectName}`);

  const thumbnail = await upload(objectName, compressed);
  console.log(`(${id}) Thumbnail: ${thumbnail}`);

  const { body, status, statusText } = await notify(id, thumbnail);
  console.log(`(${id}) Notify: ${status}-${statusText} ${body}`);
};

const app = new Koa();
app.use(koaBody());
app.use((ctx) => {
  const bookmark = ctx.request.body.event.data.new;
  screenshot(bookmark);
  ctx.body = bookmark;
});

app.listen(8080);

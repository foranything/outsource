import { getInfo } from '../src/crawl-freemoa';
const fs = require('fs');

(async () => {
  const info = await getInfo();
  fs.writeFileSync(`content1.txt`, JSON.stringify(info, null, 2));
})();

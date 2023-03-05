import * as puppeteer from 'puppeteer';
import { getSourceFromId } from '../src/crawl-freemoa';

async function getInfo() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: false
  });
  const source = await getSourceFromId(browser, '44446');
  console.log(source);
  await browser.close();
}

getInfo();

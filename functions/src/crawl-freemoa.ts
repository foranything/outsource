import * as puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';

dotenv.config();

export async function getInfo(): Promise<(string | undefined)[] | undefined> {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    page.setDefaultTimeout(3000);
    await login(browser);
    const ids = await getPageItemIds(browser);
    const info = [];
    if (!ids?.length) throw new Error('No items found');

    for (let id of ids) {
      const source = await getSourceFromId(browser, id);
      info.push(source);
    }

    await browser.close();

    return info;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function login(browser: puppeteer.Browser) {
  try {
    const page = await browser.newPage();

    const id = process.env.FREEMOA_ID;
    const pw = process.env.FREEMOA_PW;

    if (!id || !pw) throw new Error('ID or PW not set');

    await gotoWrap(page, 'https://www.freemoa.net/m0/s02');

    const idSelector = '#loginIdInput';
    const pwSelector = '#loginPwInput';

    await page.waitForSelector(idSelector);
    await page.type(idSelector, id);
    await page.type(pwSelector, pw);
    await page.click('#loginBtn');
  } catch (error) {
    console.error(error);
  }
}

export async function getSourceFromId(
  browser: puppeteer.Browser,
  id: string
): Promise<string | undefined> {
  const page = await browser.newPage();
  await gotoWrap(
    page,
    `https://www.freemoa.net/m4/s41?pno=${id}&first_pno=${id}`
  );
  const text = await getText(page);
  console.info('source: ', text);
  await page.close();
  return text;
}

export async function gotoWrap(
  page: puppeteer.Page,
  url: string
): Promise<void> {
  try {
    console.info('try goto: ', url);
    const promises = [];
    promises.push(page.waitForNavigation());
    await page.goto(url);
    await Promise.all(promises);
    console.info('success goto: ', url);
  } catch (error) {
    console.error(error, 'target:', url);
  }
}

export async function getText(
  page: puppeteer.Page
): Promise<string | undefined> {
  try {
    const article = await page.$('#projectViewConMidArticle');
    if (!article) return;
    return await page.evaluate((el) => (el as HTMLElement).innerText, article);
  } catch (ec) {
    console.error(ec);
    return;
  }
}

async function getPageItemIds(
  browser: puppeteer.Browser
): Promise<string[] | undefined> {
  try {
    const page = await browser.newPage();
    await gotoWrap(page, 'https://www.freemoa.net/m4/s41?page=1');
    await page.waitForResponse('https://www.freemoa.net/m4a/s41a');
    const items = await page.$$('.proj-list-item_li_new .projectInfo');
    const ids: string[] = [];
    for (let item of items) {
      const pno = await page.evaluate(
        (el) => el.getAttribute('data-pno'),
        item
      );
      if (pno) ids.push(pno);
    }
    items.forEach((item) => item.dispose());
    await page.close();
    return ids;
  } catch (error) {
    console.error(error);
    return;
  }
}

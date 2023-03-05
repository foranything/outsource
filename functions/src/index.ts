import * as functions from 'firebase-functions';
import { getInfo } from './crawl-freemoa';

export const crawl = functions
  .region('asia-northeast3')
  .runWith({
    timeoutSeconds: 300,
    memory: '1GB'
  })
  .https.onRequest(async (request, response) => {
    const info = await getInfo();
    if (info) {
      response.send(JSON.stringify(info));
    } else {
      response.status(404).send('Not Found');
    }
  });
